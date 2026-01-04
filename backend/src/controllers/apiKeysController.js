import { query } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';
import { 
  verifyExternalAccount, 
  createExternalApiKey, 
  deleteExternalApiKey,
  checkServiceHealth 
} from '../services/externalServiceClient.js';

// Generate random API key
const generateApiKey = () => {
  const prefix = 'fs';
  const random = crypto.randomBytes(32).toString('hex');
  return `${prefix}_${random}`;
};

// Get all API keys for user
export const getApiKeys = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      `SELECT 
        k.id,
        k.name,
        k.key,
        k.status,
        k.rate_limit,
        k.created_at,
        k.last_used,
        k.expires_at,
        s.name as service_name,
        s.display_name as service_display_name,
        ca.id as connected_account_id,
        ca.external_user_id
       FROM api_keys k
       LEFT JOIN api_services s ON k.service_id = s.id
       LEFT JOIN connected_accounts ca ON k.connected_account_id = ca.id
       WHERE k.user_id = $1
       ORDER BY k.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get API keys error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der API Keys'
    });
  }
};

// Create new API key with service integration
export const createApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, serviceId, rateLimit = 1000, expiresInDays } = req.body;

    // Validate service ID
    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: 'Service muss ausgewählt werden'
      });
    }

    // Get service details
    const serviceResult = await query(
      'SELECT id, name, display_name FROM api_services WHERE id = $1',
      [serviceId]
    );

    if (serviceResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Service nicht gefunden'
      });
    }

    const service = serviceResult.rows[0];

    // Check if user has a connected account for this service
    const connectedAccountResult = await query(
      `SELECT id, external_user_id, access_token, status 
       FROM connected_accounts 
       WHERE user_id = $1 AND service_id = $2 AND status = 'active'`,
      [userId, serviceId]
    );

    if (connectedAccountResult.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: `Du musst zuerst deinen ${service.display_name} Account verbinden`,
        requiresConnection: true,
        serviceName: service.display_name
      });
    }

    const connectedAccount = connectedAccountResult.rows[0];

    // Check if external service is available
    const serviceAvailable = await checkServiceHealth(service.name);
    if (!serviceAvailable) {
      return res.status(503).json({
        success: false,
        message: `${service.display_name} ist momentan nicht erreichbar. Bitte versuche es später erneut.`
      });
    }

    // Verify account on external service
    const accountValid = await verifyExternalAccount(
      service.name,
      connectedAccount.external_user_id,
      connectedAccount.access_token
    );

    if (!accountValid) {
      return res.status(401).json({
        success: false,
        message: `Dein ${service.display_name} Account konnte nicht verifiziert werden. Bitte verbinde deinen Account erneut.`,
        requiresReconnection: true
      });
    }

    // Generate FrameSphere API key
    const frameSphereKey = generateApiKey();

    // Calculate expiration date if specified
    let expiresAt = null;
    if (expiresInDays) {
      expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(expiresInDays));
    }

    // Create API key on external service
    let externalKeyData;
    try {
      externalKeyData = await createExternalApiKey(
        service.name,
        connectedAccount.external_user_id,
        connectedAccount.access_token,
        {
          name: `FrameSphere - ${name}`,
          rateLimit,
          permissions: {}
        }
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Fehler beim Erstellen des API Keys auf ${service.display_name}: ${error.message}`
      });
    }

    // Store in FrameSphere database with external key reference
    const result = await query(
      `INSERT INTO api_keys (
        user_id, 
        name, 
        key, 
        service_id,
        connected_account_id,
        rate_limit, 
        expires_at,
        permissions
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, name, key, status, rate_limit, created_at, expires_at`,
      [
        userId, 
        name, 
        frameSphereKey, 
        serviceId,
        connectedAccount.id,
        rateLimit, 
        expiresAt,
        JSON.stringify({ 
          external_key_id: externalKeyData.externalKeyId,
          external_key: externalKeyData.externalKey 
        })
      ]
    );

    const apiKeyData = result.rows[0];

    res.status(201).json({
      success: true,
      message: `API Key erfolgreich erstellt für ${service.display_name}`,
      apiKey: {
        ...apiKeyData,
        service_name: service.name,
        service_display_name: service.display_name,
        external_key: externalKeyData.externalKey
      }
    });
  } catch (error) {
    console.error('Create API key error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Erstellen des API Keys'
    });
  }
};

// Update API key
export const updateApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, status, rateLimit } = req.body;

    const result = await query(
      `UPDATE api_keys
       SET 
        name = COALESCE($1, name),
        status = COALESCE($2, status),
        rate_limit = COALESCE($3, rate_limit)
       WHERE id = $4 AND user_id = $5
       RETURNING id, name, key, status, rate_limit, created_at, last_used, expires_at`,
      [name, status, rateLimit, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'API Key nicht gefunden'
      });
    }

    res.json({
      success: true,
      message: 'API Key erfolgreich aktualisiert',
      apiKey: result.rows[0]
    });
  } catch (error) {
    console.error('Update API key error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Aktualisieren des API Keys'
    });
  }
};

// Delete API key (with external service cleanup)
export const deleteApiKey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Get API key details including service and external key info
    const keyResult = await query(
      `SELECT 
        k.id,
        k.permissions,
        s.name as service_name,
        ca.access_token
       FROM api_keys k
       LEFT JOIN api_services s ON k.service_id = s.id
       LEFT JOIN connected_accounts ca ON k.connected_account_id = ca.id
       WHERE k.id = $1 AND k.user_id = $2`,
      [id, userId]
    );

    if (keyResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'API Key nicht gefunden'
      });
    }

    const apiKey = keyResult.rows[0];

    // Try to delete from external service if it exists
    if (apiKey.service_name && apiKey.permissions) {
      try {
        const permissions = JSON.parse(apiKey.permissions);
        if (permissions.external_key_id) {
          await deleteExternalApiKey(
            apiKey.service_name,
            permissions.external_key_id,
            apiKey.access_token
          );
        }
      } catch (error) {
        console.error('Failed to delete external API key:', error);
        // Continue with FrameSphere deletion even if external deletion fails
      }
    }

    // Delete from FrameSphere database
    await query(
      'DELETE FROM api_keys WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    res.json({
      success: true,
      message: 'API Key erfolgreich gelöscht'
    });
  } catch (error) {
    console.error('Delete API key error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Löschen des API Keys'
    });
  }
};

// Get API key usage statistics
export const getApiKeyStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Verify ownership
    const keyCheck = await query(
      'SELECT id FROM api_keys WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (keyCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'API Key nicht gefunden'
      });
    }

    // Get usage stats
    const stats = await query(
      `SELECT 
        COUNT(*) as total_calls,
        COALESCE(SUM(tokens_used), 0) as total_tokens,
        AVG(duration_ms) as avg_duration,
        COUNT(DISTINCT DATE(created_at)) as active_days
       FROM api_usage_logs
       WHERE api_key_id = $1 AND created_at >= NOW() - INTERVAL '30 days'`,
      [id]
    );

    // Get recent usage
    const recentUsage = await query(
      `SELECT 
        s.display_name as service,
        COUNT(*) as calls,
        MAX(l.created_at) as last_used
       FROM api_usage_logs l
       JOIN api_services s ON l.service_id = s.id
       WHERE l.api_key_id = $1 AND l.created_at >= NOW() - INTERVAL '7 days'
       GROUP BY s.id, s.display_name
       ORDER BY calls DESC
       LIMIT 5`,
      [id]
    );

    res.json({
      success: true,
      stats: stats.rows[0],
      recentUsage: recentUsage.rows
    });
  } catch (error) {
    console.error('API key stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Statistiken'
    });
  }
};
