import { query } from '../config/database.js';

// Hilfsfunktion: query der bei "relation does not exist" 0 zurückgibt
async function safeCount(sql, params = []) {
  try {
    const result = await query(sql, params);
    return result.rows[0];
  } catch (err) {
    if (err.code === '42P01') return { count: 0, total: 0, balance: 0, spent: 0 };
    throw err;
  }
}

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [apiCallsRow, tokensRow, keysRow, creditRow, debitRow] = await Promise.all([
      safeCount(
        `SELECT COUNT(*) as count FROM api_usage_logs
         WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '30 days'`,
        [userId]
      ),
      safeCount(
        `SELECT COALESCE(SUM(tokens_used), 0) as total FROM api_usage_logs
         WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '30 days'`,
        [userId]
      ),
      safeCount(
        `SELECT COUNT(*) as count FROM api_keys
         WHERE user_id = $1 AND status = 'active'`,
        [userId]
      ),
      safeCount(
        `SELECT COALESCE(SUM(amount), 0) as balance FROM transactions
         WHERE user_id = $1 AND status = 'completed' AND type = 'credit'`,
        [userId]
      ),
      safeCount(
        `SELECT COALESCE(SUM(amount), 0) as spent FROM transactions
         WHERE user_id = $1 AND status = 'completed' AND type = 'debit'`,
        [userId]
      ),
    ]);

    const balance = parseFloat(creditRow.balance || 0) - parseFloat(debitRow.spent || 0);

    res.json({
      apiCalls:   parseInt(apiCallsRow.count  || 0),
      tokensUsed: parseInt(tokensRow.total    || 0),
      activeKeys: parseInt(keysRow.count      || 0),
      balance:    isNaN(balance) ? 0 : balance,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    // Fallback: immer 200 zurückgeben, nie 500
    res.json({ apiCalls: 0, tokensUsed: 0, activeKeys: 0, balance: 0 });
  }
};

// Get API usage over time
export const getUsageHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const days = Math.min(parseInt(req.query.days || '7'), 90);

    const result = await query(
      `SELECT
        DATE(created_at) as date,
        COUNT(*) as api_calls,
        COALESCE(SUM(tokens_used), 0) as tokens_used,
        COUNT(DISTINCT service_id) as services_used
       FROM api_usage_logs
       WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '${days} days'
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [userId]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    if (error.code === '42P01') {
      return res.json({ success: true, data: [] });
    }
    console.error('Usage history error:', error);
    res.json({ success: true, data: [] });
  }
};

// Get service usage breakdown
export const getServiceBreakdown = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      `SELECT
        s.display_name as service_name,
        COUNT(l.id) as api_calls,
        COALESCE(SUM(l.tokens_used), 0) as tokens_used,
        MAX(l.created_at) as last_used
       FROM api_usage_logs l
       JOIN api_services s ON l.service_id = s.id
       WHERE l.user_id = $1 AND l.created_at >= NOW() - INTERVAL '30 days'
       GROUP BY s.id, s.display_name
       ORDER BY api_calls DESC`,
      [userId]
    );

    res.json({ success: true, data: result.rows });
  } catch (error) {
    if (error.code === '42P01') {
      return res.json({ success: true, data: [] });
    }
    console.error('Service breakdown error:', error);
    res.json({ success: true, data: [] });
  }
};
