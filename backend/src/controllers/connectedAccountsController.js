import { query } from '../config/database.js';
import axios from 'axios';
import crypto from 'crypto';

// Service Endpoints
const SERVICE_ENDPOINTS = {
  'framespell': {
    baseUrl: 'http://localhost:8000',
    verifyEndpoint: '/api/auth/verify-connection',
    statsEndpoint: '/api/stats/usage',
    syncEndpoint: '/api/sync/framesphere'
  },
  'corechain-ai': {
    baseUrl: 'http://localhost:9000',
    verifyEndpoint: '/api/auth/verify-connection',
    statsEndpoint: '/api/stats/usage',
    syncEndpoint: '/api/sync/framesphere'
  },
  'corechain-api': {
    baseUrl: 'http://localhost:9001',
    verifyEndpoint: '/api/auth/verify-connection',
    statsEndpoint: '/api/stats/usage',
    syncEndpoint: '/api/sync/framesphere'
  },
  'spherehub': {
    baseUrl: 'http://localhost:10000',
    verifyEndpoint: '/api/auth/verify-connection',
    statsEndpoint: '/api/stats/usage',
    syncEndpoint: '/api/sync/framesphere'
  },
  'spherenet': {
    baseUrl: 'http://localhost:10001',
    verifyEndpoint: '/api/auth/verify-connection',
    statsEndpoint: '/api/stats/usage',
    syncEndpoint: '/api/sync/framesphere'
  }
};

// Simple encryption (in production, use proper encryption library)
const encryptApiKey = (apiKey) => {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY || 'framesphere-secret-key-2025');
  let encrypted = cipher.update(apiKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decryptApiKey = (encryptedKey) => {
  const decipher = crypto.createDecipher('aes-256-cbc', process.env.ENCRYPTION_KEY || 'framesphere-secret-key-2025');
  let decrypted = decipher.update(encryptedKey, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Verify connection with external service
const verifyExternalConnection = async (serviceId, apiKey, accountId = null) => {
  try {
    const config = SERVICE_ENDPOINTS[serviceId];
    if (!config) {
      throw new Error(`Unknown service: ${serviceId}`);
    }

    const response = await axios.post(
      `${config.baseUrl}${config.verifyEndpoint}`,
      {
        api_key: apiKey,
        account_id: accountId,
        source: 'framesphere'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error(`Failed to verify connection with ${serviceId}:`, error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
};

// Sync connection with external service
const syncWithExternalService = async (serviceId, apiKey, frameSphereUserId, connectionData) => {
  try {
    const config = SERVICE_ENDPOINTS[serviceId];
    if (!config) {
      return { success: false };
    }

    await axios.post(
      `${config.baseUrl}${config.syncEndpoint}`,
      {
        framesphere_user_id: frameSphereUserId,
        connection_id: connectionData.id,
        api_key: apiKey,
        sync_type: 'connect'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    );

    return { success: true };
  } catch (error) {
    console.error(`Failed to sync with ${serviceId}:`, error.message);
    return { success: false };
  }
};

// Get all connected accounts for a user
export const getConnectedAccounts = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      `SELECT 
        ca.id,
        ca.user_id,
        ca.account_name,
        ca.external_user_id,
        ca.status,
        ca.last_sync_at,
        ca.created_at,
        ca.metadata,
        s.id as service_id,
        s.name as service_name,
        s.display_name as service_display_name
       FROM connected_accounts ca
       JOIN api_services s ON ca.service_id = s.id
       WHERE ca.user_id = $1
       ORDER BY ca.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching connected accounts:', error);
    res.status(500).json({ 
      success: false,
      message: 'Fehler beim Abrufen der verbundenen Accounts' 
    });
  }
};

// Connect a new account
export const connectAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, productName, accountId, apiKey, accountName } = req.body;

    // Validate input
    if (!productId || !apiKey || !accountName) {
      return res.status(400).json({ 
        success: false,
        message: 'Alle erforderlichen Felder müssen ausgefüllt werden' 
      });
    }

    // Get service ID from api_services table
    const serviceResult = await query(
      'SELECT id, name, display_name FROM api_services WHERE name = $1',
      [productId]
    );

    if (serviceResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Service nicht gefunden' 
      });
    }

    const service = serviceResult.rows[0];

    // Check if account already connected
    const existing = await query(
      'SELECT id FROM connected_accounts WHERE user_id = $1 AND service_id = $2',
      [userId, service.id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Dieser Service ist bereits verbunden' 
      });
    }

    // Verify connection with external service
    const verification = await verifyExternalConnection(productId, apiKey, accountId);
    
    if (!verification.success) {
      return res.status(401).json({ 
        success: false,
        message: `Verbindung fehlgeschlagen: ${verification.error}` 
      });
    }

    // Encrypt API key
    const encryptedKey = encryptApiKey(apiKey);

    // Store connection in database
    const result = await query(
      `INSERT INTO connected_accounts (
        user_id,
        service_id,
        account_name,
        external_user_id,
        access_token,
        status,
        metadata,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING id, user_id, service_id, account_name, external_user_id, status, created_at`,
      [
        userId, 
        service.id, 
        accountName, 
        accountId || verification.data?.user_id || userId,
        encryptedKey,
        'active',
        JSON.stringify({
          verified_at: new Date().toISOString(),
          verification_data: verification.data
        })
      ]
    );

    const connection = result.rows[0];

    // Sync with external service (non-blocking)
    syncWithExternalService(productId, apiKey, userId, connection)
      .catch(err => console.error('Sync failed but connection created:', err));

    res.status(201).json({
      success: true,
      message: 'Account erfolgreich verbunden',
      account: {
        ...connection,
        service_name: service.name,
        service_display_name: service.display_name
      }
    });
  } catch (error) {
    console.error('Error connecting account:', error);
    res.status(500).json({ 
      success: false,
      message: 'Fehler beim Verbinden des Accounts' 
    });
  }
};

// Refresh account statistics
export const refreshAccountStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Get account details
    const accountResult = await query(
      `SELECT 
        ca.*,
        s.name as service_name
       FROM connected_accounts ca
       JOIN api_services s ON ca.service_id = s.id
       WHERE ca.id = $1 AND ca.user_id = $2`,
      [id, userId]
    );

    if (accountResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Account nicht gefunden' 
      });
    }

    const account = accountResult.rows[0];
    const decryptedKey = decryptApiKey(account.access_token);

    // Fetch stats from external service
    const config = SERVICE_ENDPOINTS[account.service_name];
    if (!config) {
      return res.status(400).json({ 
        success: false,
        message: 'Service-Konfiguration nicht gefunden' 
      });
    }

    try {
      const response = await axios.get(
        `${config.baseUrl}${config.statsEndpoint}`,
        {
          headers: {
            'Authorization': `Bearer ${decryptedKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );

      const stats = response.data;

      // Update stats in database
      await query(
        `UPDATE connected_accounts 
         SET metadata = $1, last_sync_at = NOW()
         WHERE id = $2`,
        [JSON.stringify({ ...JSON.parse(account.metadata || '{}'), stats, last_refresh: new Date().toISOString() }), id]
      );

      res.json({ 
        success: true,
        message: 'Statistiken erfolgreich aktualisiert',
        stats 
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error.message);
      res.status(503).json({ 
        success: false,
        message: 'Service momentan nicht erreichbar' 
      });
    }
  } catch (error) {
    console.error('Error refreshing account stats:', error);
    res.status(500).json({ 
      success: false,
      message: 'Fehler beim Aktualisieren der Statistiken' 
    });
  }
};

// Disconnect/delete an account
export const disconnectAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Get account details for cleanup
    const accountResult = await query(
      `SELECT ca.*, s.name as service_name 
       FROM connected_accounts ca
       JOIN api_services s ON ca.service_id = s.id
       WHERE ca.id = $1 AND ca.user_id = $2`,
      [id, userId]
    );

    if (accountResult.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Account nicht gefunden' 
      });
    }

    const account = accountResult.rows[0];

    // Notify external service about disconnection (non-blocking)
    try {
      const config = SERVICE_ENDPOINTS[account.service_name];
      const decryptedKey = decryptApiKey(account.access_token);
      
      if (config) {
        await axios.post(
          `${config.baseUrl}${config.syncEndpoint}`,
          {
            framesphere_user_id: userId,
            connection_id: id,
            sync_type: 'disconnect'
          },
          {
            headers: {
              'Authorization': `Bearer ${decryptedKey}`,
              'Content-Type': 'application/json'
            },
            timeout: 3000
          }
        );
      }
    } catch (error) {
      console.error('Failed to notify service about disconnection:', error.message);
      // Continue with local deletion even if external notification fails
    }

    // Delete from database
    await query(
      'DELETE FROM connected_accounts WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    res.json({ 
      success: true,
      message: 'Account erfolgreich getrennt' 
    });
  } catch (error) {
    console.error('Error disconnecting account:', error);
    res.status(500).json({ 
      success: false,
      message: 'Fehler beim Trennen des Accounts' 
    });
  }
};
