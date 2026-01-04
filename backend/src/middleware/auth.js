import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access token required' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }
    return res.status(403).json({ 
      success: false,
      message: 'Invalid token' 
    });
  }
};

export const authenticateApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ 
      success: false,
      message: 'API key required' 
    });
  }

  try {
    const { query } = await import('../config/database.js');
    const result = await query(
      `SELECT ak.*, u.id as user_id, u.email, u.status as user_status
       FROM api_keys ak
       JOIN users u ON ak.user_id = u.id
       WHERE ak.key = $1 AND ak.status = 'active'`,
      [apiKey]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ 
        success: false,
        message: 'Invalid or inactive API key' 
      });
    }

    const apiKeyData = result.rows[0];

    // Check if user is active
    if (apiKeyData.user_status !== 'active') {
      return res.status(403).json({ 
        success: false,
        message: 'User account is not active' 
      });
    }

    // Update last_used timestamp
    await query(
      'UPDATE api_keys SET last_used = CURRENT_TIMESTAMP WHERE id = $1',
      [apiKeyData.id]
    );

    req.apiKey = apiKeyData;
    req.user = {
      id: apiKeyData.user_id,
      email: apiKeyData.email
    };

    next();
  } catch (error) {
    console.error('API key authentication error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Authentication error' 
    });
  }
};

export const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    // Silently fail for optional auth
  }

  next();
};
