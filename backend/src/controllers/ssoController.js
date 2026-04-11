import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';

// ─── Registered SSO Clients ────────────────────────────────────────────────
// In production these could live in a DB table. For now env-based.
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
};

const getClient = (clientId) => {
  const client = CLIENTS[clientId];
  if (!client || !client.secret) return null;
  return client;
};

// ─── GET /api/sso/client-info?client_id=frametrain ────────────────────────
// Called by frontend consent page to show product name / info
export const clientInfo = async (req, res) => {
  const { client_id, redirect_uri } = req.query;
  const client = getClient(client_id);

  if (!client) {
    return res.status(400).json({ success: false, message: 'Unbekannter Client' });
  }

  const uriAllowed = client.allowedRedirectUris.some(
    (allowed) => redirect_uri && redirect_uri.startsWith(allowed.replace('/callback', ''))
  );

  if (!uriAllowed) {
    return res.status(400).json({ success: false, message: 'Ungültige redirect_uri' });
  }

  res.json({ success: true, clientName: client.name, clientId: client_id });
};

// ─── POST /api/sso/approve ─────────────────────────────────────────────────
// Called when logged-in FrameSphere user approves the consent screen
export const approve = async (req, res) => {
  const { client_id, redirect_uri, state } = req.body;
  const userId = req.user?.id; // set by authenticateToken middleware

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Nicht eingeloggt' });
  }

  const client = getClient(client_id);
  if (!client) {
    return res.status(400).json({ success: false, message: 'Unbekannter Client' });
  }

  const uriAllowed = client.allowedRedirectUris.some(
    (allowed) => redirect_uri && redirect_uri.startsWith(allowed.replace('/callback', ''))
  );
  if (!uriAllowed) {
    return res.status(400).json({ success: false, message: 'Ungültige redirect_uri' });
  }

  // Generate short-lived one-time code (valid 60 seconds)
  const code = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 1000);

  await query(
    `INSERT INTO sso_codes (code, user_id, client_id, expires_at)
     VALUES ($1, $2, $3, $4)`,
    [code, userId, client_id, expiresAt]
  );

  // Redirect product back to its callback with the code
  const params = new URLSearchParams({ code, state: state || '' });
  res.json({ success: true, redirectUrl: `${redirect_uri}?${params}` });
};

// ─── POST /api/sso/deny ────────────────────────────────────────────────────
export const deny = async (req, res) => {
  const { redirect_uri, state } = req.body;
  const params = new URLSearchParams({ error: 'access_denied', state: state || '' });
  res.json({ success: true, redirectUrl: `${redirect_uri}?${params}` });
};

// ─── POST /api/sso/token ───────────────────────────────────────────────────
// Called server-to-server by the product (FrameTrain) to exchange code for user info
export const token = async (req, res) => {
  const { code, client_id, client_secret, product_user_id } = req.body;

  if (!code || !client_id || !client_secret) {
    return res.status(400).json({ success: false, message: 'Fehlende Parameter' });
  }

  const client = getClient(client_id);
  if (!client || client.secret !== client_secret) {
    return res.status(401).json({ success: false, message: 'Ungültige Client-Credentials' });
  }

  // Find and validate code
  const codeResult = await query(
    `SELECT * FROM sso_codes WHERE code = $1`,
    [code]
  );

  if (codeResult.rows.length === 0) {
    return res.status(400).json({ success: false, message: 'Ungültiger Code' });
  }

  const ssoCode = codeResult.rows[0];

  if (ssoCode.used) {
    return res.status(400).json({ success: false, message: 'Code bereits verwendet' });
  }

  if (new Date(ssoCode.expires_at) < new Date()) {
    return res.status(400).json({ success: false, message: 'Code abgelaufen' });
  }

  if (ssoCode.client_id !== client_id) {
    return res.status(400).json({ success: false, message: 'Code gehört nicht zu diesem Client' });
  }

  // Mark code as used
  await query(`UPDATE sso_codes SET used = TRUE WHERE code = $1`, [code]);

  // Fetch FrameSphere user
  const userResult = await query(
    `SELECT id, name, email, role, avatar_url FROM users WHERE id = $1`,
    [ssoCode.user_id]
  );

  if (userResult.rows.length === 0) {
    return res.status(404).json({ success: false, message: 'Benutzer nicht gefunden' });
  }

  const user = userResult.rows[0];

  // If the product sends its own user_id, record the connection
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
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatar_url,
    },
  });
};

// ─── GET /api/sso/connections ──────────────────────────────────────────────
// Returns which products the current FrameSphere user has connected via SSO
export const getConnections = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false });

  const result = await query(
    `SELECT product, product_user_id, connected_at FROM connected_products
     WHERE framesphere_user_id = $1`,
    [userId]
  );

  res.json({ success: true, connections: result.rows });
};
