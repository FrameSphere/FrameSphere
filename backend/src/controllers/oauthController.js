import jwt from 'jsonwebtoken';
import axios from 'axios';
import { query } from '../config/database.js';

// ─── Helpers ───────────────────────────────────────────────────────────────

const generateToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

const buildRedirect = (token, user, error = null) => {
  const base = process.env.FRONTEND_URL || 'http://localhost:5173';
  if (error) return `${base}/auth/callback?error=${encodeURIComponent(error)}`;
  return `${base}/auth/callback?token=${token}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&role=${user.role}`;
};

/** Find existing OAuth user or create a new one */
const findOrCreateUser = async ({ provider, providerId, email, name, avatarUrl }) => {
  // 1. Already linked via OAuth
  let result = await query(
    `SELECT id, name, email, role, status FROM users
     WHERE oauth_provider = $1 AND oauth_provider_id = $2`,
    [provider, providerId]
  );
  if (result.rows.length > 0) return result.rows[0];

  // 2. Email already exists → link OAuth to that account
  if (email) {
    result = await query(
      `UPDATE users
       SET oauth_provider = $1, oauth_provider_id = $2,
           avatar_url = $3, updated_at = CURRENT_TIMESTAMP
       WHERE email = $4
       RETURNING id, name, email, role, status`,
      [provider, providerId, avatarUrl, email]
    );
    if (result.rows.length > 0) return result.rows[0];
  }

  // 3. New user
  result = await query(
    `INSERT INTO users (name, email, oauth_provider, oauth_provider_id, avatar_url, email_verified)
     VALUES ($1, $2, $3, $4, $5, TRUE)
     RETURNING id, name, email, role, status`,
    [name, email || null, provider, providerId, avatarUrl]
  );
  return result.rows[0];
};

// ─── Google ────────────────────────────────────────────────────────────────

export const googleRedirect = (_req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_CALLBACK_URL,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};

export const googleCallback = async (req, res) => {
  const { code, error } = req.query;
  if (error || !code) {
    return res.redirect(buildRedirect(null, null, 'Google-Anmeldung abgebrochen'));
  }

  try {
    // Exchange code for tokens
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_CALLBACK_URL,
      grant_type: 'authorization_code',
    });

    // Fetch user info
    const userRes = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenRes.data.access_token}` },
    });

    const { sub, email, name, picture } = userRes.data;
    const user = await findOrCreateUser({
      provider: 'google',
      providerId: sub,
      email,
      name: name || email,
      avatarUrl: picture,
    });

    if (user.status !== 'active') {
      return res.redirect(buildRedirect(null, null, 'Konto ist nicht aktiv'));
    }

    await query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
    const token = generateToken(user);
    res.redirect(buildRedirect(token, user));
  } catch (err) {
    console.error('Google OAuth error:', err.response?.data || err.message);
    res.redirect(buildRedirect(null, null, 'Google-Anmeldung fehlgeschlagen'));
  }
};

// ─── GitHub ────────────────────────────────────────────────────────────────

export const githubRedirect = (_req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_CALLBACK_URL,
    scope: 'read:user user:email',
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
};

export const githubCallback = async (req, res) => {
  const { code, error } = req.query;
  if (error || !code) {
    return res.redirect(buildRedirect(null, null, 'GitHub-Anmeldung abgebrochen'));
  }

  try {
    // Exchange code for access token
    const tokenRes = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_uri: process.env.GITHUB_CALLBACK_URL,
        code,
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken = tokenRes.data.access_token;

    // Fetch user profile
    const [userRes, emailsRes] = await Promise.all([
      axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      axios.get('https://api.github.com/user/emails', {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    const { id, name, login, avatar_url } = userRes.data;
    const primaryEmail =
      emailsRes.data.find((e) => e.primary && e.verified)?.email ||
      emailsRes.data[0]?.email ||
      null;

    const user = await findOrCreateUser({
      provider: 'github',
      providerId: String(id),
      email: primaryEmail,
      name: name || login,
      avatarUrl: avatar_url,
    });

    if (user.status !== 'active') {
      return res.redirect(buildRedirect(null, null, 'Konto ist nicht aktiv'));
    }

    await query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [user.id]);
    const token = generateToken(user);
    res.redirect(buildRedirect(token, user));
  } catch (err) {
    console.error('GitHub OAuth error:', err.response?.data || err.message);
    res.redirect(buildRedirect(null, null, 'GitHub-Anmeldung fehlgeschlagen'));
  }
};
