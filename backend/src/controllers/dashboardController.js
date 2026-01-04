import { query } from '../config/database.js';

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get API calls count
    const apiCallsResult = await query(
      `SELECT COUNT(*) as count
       FROM api_usage_logs
       WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '30 days'`,
      [userId]
    );

    // Get tokens used
    const tokensResult = await query(
      `SELECT COALESCE(SUM(tokens_used), 0) as total
       FROM api_usage_logs
       WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '30 days'`,
      [userId]
    );

    // Get active API keys count
    const keysResult = await query(
      `SELECT COUNT(*) as count
       FROM api_keys
       WHERE user_id = $1 AND status = 'active'`,
      [userId]
    );

    // Get current balance/subscription
    const subscriptionResult = await query(
      `SELECT COALESCE(SUM(amount), 0) as balance
       FROM transactions
       WHERE user_id = $1 AND status = 'completed' AND type = 'credit'`,
      [userId]
    );

    const spentResult = await query(
      `SELECT COALESCE(SUM(amount), 0) as spent
       FROM transactions
       WHERE user_id = $1 AND status = 'completed' AND type = 'debit'`,
      [userId]
    );

    const balance = parseFloat(subscriptionResult.rows[0].balance) - parseFloat(spentResult.rows[0].spent);

    res.json({
      apiCalls: parseInt(apiCallsResult.rows[0].count),
      tokensUsed: parseInt(tokensResult.rows[0].total),
      activeKeys: parseInt(keysResult.rows[0].count),
      balance: balance
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Statistiken'
    });
  }
};

// Get API usage over time
export const getUsageHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { days = 7 } = req.query;

    const result = await query(
      `SELECT 
        DATE(created_at) as date,
        COUNT(*) as api_calls,
        COALESCE(SUM(tokens_used), 0) as tokens_used,
        COUNT(DISTINCT service_id) as services_used
       FROM api_usage_logs
       WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '${parseInt(days)} days'
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [userId]
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Usage history error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Nutzungshistorie'
    });
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

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Service breakdown error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Service-Statistiken'
    });
  }
};
