import crypto from 'crypto';
import { query } from '../config/database.js';

// ─── Registered SSO Clients ────────────────────────────────────────────────
const CLIENTS = {
  frametrain: {
    name: 'FrameTrain',
    secret: process.env.SSO_FRAMETRAIN_SECRET,
    allowedRedirectUris: [
      'https://frame-train.vercel.app/api/auth/framesphere/callback',
      'http://localhost:5001/api/auth/framesphere/callback',
      'http://localhost:3000/api/auth/framesphere/callback',
    ],
  },
  'ratelimit-api': {
    name: 'RateLimit API',
    secret: process.env.SSO_RATELIMIT_SECRET,
    allowedRedirectUris: [
      'https://ratelimit-api.pages.dev/auth/callback',
      'http://localhost:5174/auth/callback',
      'http://localhost:3000/auth/callback',
    ],
  },
};

const getClient = (clientId) => {
  const client = CLIENTS[clientId];
  if (!client || !client.secret) return null;
  return client;
};

/** Build redirect URL, correctly handling existing query params */
const buildRedirectUrl = (base, params) => {
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}${new URLSearchParams(params)}`;
};

// ─── GET /api/sso/client-info ──────────────────────────────────────────────
export const clientInfo = async (req, res) => {
  const { client_id, redirect_uri } = req.query;
  const client = getClient(client_id);
  if (!client) return res.status(400).json({ success: false, message: 'Unbekannter Client' });

  const uriAllowed = client.allowedRedirectUris.some(allowed =>
    redirect_uri && redirect_uri.split('?')[0].startsWith(allowed.split('?')[0])
  );
  if (!uriAllowed) return res.status(400).json({ success: false, message: 'Ungültige redirect_uri' });

  res.json({ success: true, clientName: client.name, clientId: client_id });
};

// ─── POST /api/sso/approve ─────────────────────────────────────────────────
export const approve = async (req, res) => {
  const { client_id, redirect_uri, state } = req.body;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: 'Nicht eingeloggt' });

  const client = getClient(client_id);
  if (!client) return res.status(400).json({ success: false, message: 'Unbekannter Client' });

  const uriAllowed = client.allowedRedirectUris.some(allowed =>
    redirect_uri && redirect_uri.split('?')[0].startsWith(allowed.split('?')[0])
  );
  if (!uriAllowed) return res.status(400).json({ success: false, message: 'Ungültige redirect_uri' });

  const code = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 1000);

  await query(
    `INSERT INTO sso_codes (code, user_id, client_id, expires_at) VALUES ($1, $2, $3, $4)`,
    [code, userId, client_id, expiresAt]
  );

  res.json({
    success: true,
    redirectUrl: buildRedirectUrl(redirect_uri, { code, state: state || '' }),
  });
};

// ─── POST /api/sso/deny ────────────────────────────────────────────────────
export const deny = async (req, res) => {
  const { redirect_uri, state } = req.body;
  res.json({
    success: true,
    redirectUrl: buildRedirectUrl(redirect_uri, { error: 'access_denied', state: state || '' }),
  });
};

// ─── POST /api/sso/token ───────────────────────────────────────────────────
export const token = async (req, res) => {
  const { code, client_id, client_secret, product_user_id } = req.body;
  if (!code || !client_id || !client_secret) {
    return res.status(400).json({ success: false, message: 'Fehlende Parameter' });
  }

  const client = getClient(client_id);
  if (!client || client.secret !== client_secret) {
    return res.status(401).json({ success: false, message: 'Ungültige Client-Credentials' });
  }

  const codeResult = await query(`SELECT * FROM sso_codes WHERE code = $1`, [code]);
  if (codeResult.rows.length === 0) return res.status(400).json({ success: false, message: 'Ungültiger Code' });

  const ssoCode = codeResult.rows[0];
  if (ssoCode.used)                        return res.status(400).json({ success: false, message: 'Code bereits verwendet' });
  if (new Date(ssoCode.expires_at) < new Date()) return res.status(400).json({ success: false, message: 'Code abgelaufen' });
  if (ssoCode.client_id !== client_id)     return res.status(400).json({ success: false, message: 'Code gehört nicht zu diesem Client' });

  await query(`UPDATE sso_codes SET used = TRUE WHERE code = $1`, [code]);

  const userResult = await query(
    `SELECT id, name, email, role, avatar_url FROM users WHERE id = $1`,
    [ssoCode.user_id]
  );
  if (userResult.rows.length === 0) return res.status(404).json({ success: false, message: 'Benutzer nicht gefunden' });

  const user = userResult.rows[0];

  if (product_user_id) {
    await query(
      `INSERT INTO connected_products (framesphere_user_id, product, product_user_id)
       VALUES ($1, $2, $3)
       ON CONFLICT (framesphere_user_id, product)
       DO UPDATE SET product_user_id = EXCLUDED.product_user_id, connected_at = CURRENT_TIMESTAMP`,
      [user.id, client_id, product_user_id]
    );
  }

  res.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatar_url },
  });
};

// ─── GET /api/sso/connections ──────────────────────────────────────────────
export const getConnections = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false });

  const result = await query(
    `SELECT product, product_user_id, connected_at FROM connected_products WHERE framesphere_user_id = $1`,
    [userId]
  );
  res.json({ success: true, connections: result.rows });
};
