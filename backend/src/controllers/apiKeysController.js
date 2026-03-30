import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const generateApiKey = () => {
  const prefix = 'fs';
  const random = crypto.randomBytes(32).toString('hex');
  return `${prefix}_${random}`;
};

// GET /api/api-keys — alle Keys des Users
export const getApiKeys = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await query(
      `SELECT
        k.id, k.name, k.key, k.status, k.rate_limit,
        k.created_at, k.last_used, k.expires_at,
        s.name as service_name,
        s.display_name as service_display_name
       FROM api_keys k
       LEFT JOIN api_services s ON k.service_id = s.id
       WHERE k.user_id = $1
       ORDER BY k.created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    if (error.code === '42P01') return res.json([]);
    console.error('Get API keys error:', error);
    res.json([]);
  }
};

// POST /api/api-keys — neuen Key erstellen
export const createApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, serviceId, rateLimit = 1000, expiresInDays } = req.body;

    if (!name || !serviceId) {
      return res.status(400).json({ success: false, message: 'Name und Service sind erforderlich' });
    }

    const frameSphereKey = generateApiKey();
    let expiresAt = null;
    if (expiresInDays) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(expiresInDays));
    }

    const result = await query(
      `INSERT INTO api_keys (user_id, name, key, service_id, rate_limit, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, key, status, rate_limit, created_at, expires_at`,
      [userId, name, frameSphereKey, serviceId, rateLimit, expiresAt]
    );

    res.status(201).json({
      success: true,
      message: 'API Key erfolgreich erstellt',
      apiKey: { ...result.rows[0], external_key: frameSphereKey }
    });
  } catch (error) {
    if (error.code === '42P01') {
      return res.status(503).json({
        success: false,
        message: 'Die Datenbank ist noch nicht vollständig eingerichtet. Bitte wende dich an den Support.'
      });
    }
    console.error('Create API key error:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Erstellen des API Keys' });
  }
};

// PUT /api/api-keys/:id
export const updateApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, status, rateLimit } = req.body;

    const result = await query(
      `UPDATE api_keys
       SET name = COALESCE($1, name), status = COALESCE($2, status), rate_limit = COALESCE($3, rate_limit)
       WHERE id = $4 AND user_id = $5
       RETURNING id, name, key, status, rate_limit, created_at`,
      [name, status, rateLimit, id, userId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: 'API Key nicht gefunden' });

    res.json({ success: true, apiKey: result.rows[0] });
  } catch (error) {
    console.error('Update API key error:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Aktualisieren' });
  }
};

// DELETE /api/api-keys/:id
export const deleteApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await query(
      'DELETE FROM api_keys WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: 'API Key nicht gefunden' });

    res.json({ success: true, message: 'API Key erfolgreich gelöscht' });
  } catch (error) {
    if (error.code === '42P01') return res.json({ success: true });
    console.error('Delete API key error:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Löschen' });
  }
};

export const getApiKeyStats = async (req, res) => res.json({ success: true, stats: {}, recentUsage: [] });
