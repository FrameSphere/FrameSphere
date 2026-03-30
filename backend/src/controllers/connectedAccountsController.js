import { query } from '../config/database.js';
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'framesphere-secret-key-2025';

const encryptApiKey = (apiKey) => {
  try {
    const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
    let enc = cipher.update(apiKey, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
  } catch { return apiKey; }
};

const decryptApiKey = (encryptedKey) => {
  try {
    const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
    let dec = decipher.update(encryptedKey, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
  } catch { return encryptedKey; }
};

// GET /api/connected-accounts
export const getConnectedAccounts = async (req, res) => {
  try {
    const userId = req.user.id;

    // Versuche zuerst mit JOIN auf api_services
    try {
      const result = await query(
        `SELECT
          ca.id, ca.user_id, ca.account_name, ca.external_user_id,
          ca.status, ca.last_sync_at, ca.created_at,
          s.id as service_id, s.name as service_name, s.display_name as service_display_name
         FROM connected_accounts ca
         JOIN api_services s ON ca.service_id = s.id
         WHERE ca.user_id = $1
         ORDER BY ca.created_at DESC`,
        [userId]
      );
      return res.json(result.rows);
    } catch (joinErr) {
      // Fallback ohne JOIN falls api_services fehlt
      if (joinErr.code === '42P01') {
        const result = await query(
          `SELECT id, user_id, account_name, external_user_id, status, last_sync_at, created_at, service_id
           FROM connected_accounts WHERE user_id = $1 ORDER BY created_at DESC`,
          [userId]
        );
        return res.json(result.rows);
      }
      throw joinErr;
    }
  } catch (error) {
    if (error.code === '42P01') return res.json([]);
    console.error('Error fetching connected accounts:', error);
    res.json([]);
  }
};

// POST /api/connected-accounts — Account verbinden (vereinfacht, ohne externe Verifikation)
export const connectAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, productName, accountId, apiKey, accountName } = req.body;

    if (!productId || !apiKey || !accountName) {
      return res.status(400).json({ success: false, message: 'Alle Pflichtfelder ausfüllen' });
    }

    // Service aus DB holen — falls Tabelle fehlt, Fallback auf Name
    let serviceId = null;
    let serviceDisplayName = productName || productId;
    try {
      const serviceResult = await query(
        'SELECT id, display_name FROM api_services WHERE name = $1',
        [productId]
      );
      if (serviceResult.rows.length > 0) {
        serviceId    = serviceResult.rows[0].id;
        serviceDisplayName = serviceResult.rows[0].display_name;
      }
    } catch { /* Tabelle fehlt — weiter mit null */ }

    // Schon verbunden?
    try {
      const existing = await query(
        'SELECT id FROM connected_accounts WHERE user_id = $1 AND service_id = $2',
        [userId, serviceId]
      );
      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'Dieser Service ist bereits verbunden' });
      }
    } catch { /* Tabelle fehlt — skip */ }

    const encryptedKey = encryptApiKey(apiKey);

    const result = await query(
      `INSERT INTO connected_accounts
         (user_id, service_id, account_name, external_user_id, access_token, status, metadata, created_at)
       VALUES ($1, $2, $3, $4, $5, 'active', $6, NOW())
       RETURNING id, user_id, account_name, external_user_id, status, created_at`,
      [
        userId,
        serviceId,
        accountName,
        accountId || userId,
        encryptedKey,
        JSON.stringify({ connected_at: new Date().toISOString(), product_id: productId }),
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Account erfolgreich verbunden',
      account: { ...result.rows[0], service_name: productId, service_display_name: serviceDisplayName }
    });
  } catch (error) {
    if (error.code === '42P01') {
      return res.status(503).json({
        success: false,
        message: 'Datenbank noch nicht eingerichtet. Bitte wende dich an den Support.'
      });
    }
    console.error('Error connecting account:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Verbinden des Accounts' });
  }
};

// DELETE /api/connected-accounts/:id
export const disconnectAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await query(
      'DELETE FROM connected_accounts WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: 'Account nicht gefunden' });

    res.json({ success: true, message: 'Account erfolgreich getrennt' });
  } catch (error) {
    if (error.code === '42P01') return res.json({ success: true });
    console.error('Error disconnecting account:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Trennen' });
  }
};

export const refreshAccountStats = async (req, res) => {
  res.json({ success: true, message: 'Keine externen Stats verfügbar', stats: {} });
};
