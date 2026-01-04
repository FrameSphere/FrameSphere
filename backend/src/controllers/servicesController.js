import { query } from '../config/database.js';

// Get all available services
export const getAllServices = async (req, res) => {
  try {
    const result = await query(
      `SELECT 
        id,
        name,
        display_name,
        description,
        type,
        version,
        status,
        pricing
       FROM api_services
       WHERE status = 'active'
       ORDER BY display_name ASC`
    );

    res.json({
      success: true,
      services: result.rows
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Services'
    });
  }
};

// Get single service details
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT 
        id,
        name,
        display_name,
        description,
        type,
        endpoint_url,
        version,
        status,
        pricing,
        settings
       FROM api_services
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Service nicht gefunden'
      });
    }

    res.json({
      success: true,
      service: result.rows[0]
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen des Services'
    });
  }
};

// Get user's service access
export const getUserServices = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      `SELECT 
        s.id,
        s.name,
        s.display_name,
        s.description,
        s.type,
        s.version,
        sa.access_level,
        sa.granted_at,
        sa.expires_at
       FROM api_services s
       JOIN service_access sa ON s.id = sa.service_id
       WHERE sa.user_id = $1 AND s.status = 'active'
       ORDER BY s.display_name ASC`,
      [userId]
    );

    res.json({
      success: true,
      services: result.rows
    });
  } catch (error) {
    console.error('Get user services error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Abrufen der Services'
    });
  }
};

// Check if user has access to a service
export const checkServiceAccess = async (req, res) => {
  try {
    const userId = req.user.id;
    const { serviceId } = req.params;

    const result = await query(
      `SELECT 
        access_level,
        expires_at
       FROM service_access
       WHERE user_id = $1 AND service_id = $2`,
      [userId, serviceId]
    );

    if (result.rows.length === 0) {
      return res.json({
        success: true,
        hasAccess: false
      });
    }

    const access = result.rows[0];
    const isExpired = access.expires_at && new Date(access.expires_at) < new Date();

    res.json({
      success: true,
      hasAccess: !isExpired,
      accessLevel: access.access_level,
      expiresAt: access.expires_at
    });
  } catch (error) {
    console.error('Check service access error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Überprüfen des Service-Zugriffs'
    });
  }
};

// Request access to a service
export const requestServiceAccess = async (req, res) => {
  try {
    const userId = req.user.id;
    const { serviceId } = req.body;

    // Check if service exists
    const serviceCheck = await query(
      'SELECT id, name FROM api_services WHERE id = $1 AND status = $2',
      [serviceId, 'active']
    );

    if (serviceCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Service nicht gefunden'
      });
    }

    // Check if access already exists
    const existingAccess = await query(
      'SELECT id FROM service_access WHERE user_id = $1 AND service_id = $2',
      [userId, serviceId]
    );

    if (existingAccess.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Zugriff bereits vorhanden'
      });
    }

    // Grant basic access
    const result = await query(
      `INSERT INTO service_access (user_id, service_id, access_level)
       VALUES ($1, $2, $3)
       RETURNING id, access_level, granted_at`,
      [userId, serviceId, 'basic']
    );

    res.status(201).json({
      success: true,
      message: 'Zugriff erfolgreich gewährt',
      access: result.rows[0]
    });
  } catch (error) {
    console.error('Request service access error:', error);
    res.status(500).json({
      success: false,
      message: 'Fehler beim Anfordern des Service-Zugriffs'
    });
  }
};
