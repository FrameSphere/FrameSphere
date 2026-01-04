import axios from 'axios';

// Service Endpoints Configuration
const SERVICE_ENDPOINTS = {
  'framespell': {
    baseUrl: 'http://localhost:8000',
    healthEndpoint: '/health',
    apiKeysEndpoint: '/api/keys',
    verifyAccountEndpoint: '/api/auth/verify'
  },
  'corechain-api': {
    baseUrl: 'http://localhost:9000', // Placeholder - adjust to actual
    healthEndpoint: '/health',
    apiKeysEndpoint: '/api/keys',
    verifyAccountEndpoint: '/api/auth/verify'
  },
  'spherenet': {
    baseUrl: 'http://localhost:10000', // Placeholder - adjust to actual
    healthEndpoint: '/health',
    apiKeysEndpoint: '/api/keys',
    verifyAccountEndpoint: '/api/auth/verify'
  }
};

/**
 * Verify if a connected account is valid on the external service
 * @param {string} serviceName - Name of the service (framespell, corechain-api, spherenet)
 * @param {string} externalUserId - User ID on the external service
 * @param {string} externalApiKey - API key for the external service
 * @returns {Promise<boolean>}
 */
export const verifyExternalAccount = async (serviceName, externalUserId, externalApiKey) => {
  try {
    const config = SERVICE_ENDPOINTS[serviceName];
    if (!config) {
      throw new Error(`Unknown service: ${serviceName}`);
    }

    const response = await axios.post(
      `${config.baseUrl}${config.verifyAccountEndpoint}`,
      {
        user_id: externalUserId
      },
      {
        headers: {
          'Authorization': `Bearer ${externalApiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    );

    return response.data.success === true;
  } catch (error) {
    console.error(`Failed to verify account on ${serviceName}:`, error.message);
    return false;
  }
};

/**
 * Create API key on external service
 * @param {string} serviceName - Name of the service
 * @param {string} externalUserId - User ID on the external service
 * @param {string} externalAuthToken - Auth token for the external service
 * @param {object} keyData - API key data (name, permissions, etc.)
 * @returns {Promise<object>} - Created API key data from external service
 */
export const createExternalApiKey = async (serviceName, externalUserId, externalAuthToken, keyData) => {
  try {
    const config = SERVICE_ENDPOINTS[serviceName];
    if (!config) {
      throw new Error(`Unknown service: ${serviceName}`);
    }

    const response = await axios.post(
      `${config.baseUrl}${config.apiKeysEndpoint}`,
      {
        user_id: externalUserId,
        name: keyData.name,
        permissions: keyData.permissions || {},
        rate_limit: keyData.rateLimit || 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${externalAuthToken}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    );

    return {
      success: true,
      externalKeyId: response.data.id,
      externalKey: response.data.key
    };
  } catch (error) {
    console.error(`Failed to create API key on ${serviceName}:`, error.message);
    throw new Error(`Fehler beim Erstellen des API Keys auf ${serviceName}`);
  }
};

/**
 * Delete API key on external service
 * @param {string} serviceName - Name of the service
 * @param {string} externalKeyId - API key ID on the external service
 * @param {string} externalAuthToken - Auth token for the external service
 * @returns {Promise<boolean>}
 */
export const deleteExternalApiKey = async (serviceName, externalKeyId, externalAuthToken) => {
  try {
    const config = SERVICE_ENDPOINTS[serviceName];
    if (!config) {
      throw new Error(`Unknown service: ${serviceName}`);
    }

    await axios.delete(
      `${config.baseUrl}${config.apiKeysEndpoint}/${externalKeyId}`,
      {
        headers: {
          'Authorization': `Bearer ${externalAuthToken}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000
      }
    );

    return true;
  } catch (error) {
    console.error(`Failed to delete API key on ${serviceName}:`, error.message);
    return false;
  }
};

/**
 * Check if external service is available
 * @param {string} serviceName - Name of the service
 * @returns {Promise<boolean>}
 */
export const checkServiceHealth = async (serviceName) => {
  try {
    const config = SERVICE_ENDPOINTS[serviceName];
    if (!config) {
      return false;
    }

    const response = await axios.get(
      `${config.baseUrl}${config.healthEndpoint}`,
      { timeout: 3000 }
    );

    return response.status === 200;
  } catch (error) {
    console.error(`Service ${serviceName} health check failed:`, error.message);
    return false;
  }
};

/**
 * Get service configuration
 * @param {string} serviceName - Name of the service
 * @returns {object} Service configuration
 */
export const getServiceConfig = (serviceName) => {
  return SERVICE_ENDPOINTS[serviceName] || null;
};
