import { query } from '../config/database.js';

// GET /api/services — öffentlich, listet alle Services
export const getAllServices = async (req, res) => {
  try {
    const result = await query(
      `SELECT id, name, display_name, description, type, version, status, pricing
       FROM api_services WHERE status = 'active' ORDER BY display_name ASC`
    );
    // Dashboard erwartet direkt ein Array
    res.json(result.rows);
  } catch (error) {
    // Tabelle existiert noch nicht → leeres Array, kein 500
    if (error.code === '42P01') return res.json([]);
    console.error('Get services error:', error);
    res.json([]);
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      `SELECT id, name, display_name, description, type, endpoint_url, version, status, pricing, settings
       FROM api_services WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ success: false, message: 'Service nicht gefunden' });
    res.json({ success: true, service: result.rows[0] });
  } catch (error) {
    if (error.code === '42P01') return res.status(404).json({ success: false, message: 'Service nicht gefunden' });
    console.error('Get service error:', error);
    res.status(500).json({ success: false, message: 'Fehler beim Abrufen des Services' });
  }
};

export const getUserServices    = async (req, res) => res.json({ success: true, services: [] });
export const checkServiceAccess = async (req, res) => res.json({ success: true, hasAccess: false });
export const requestServiceAccess = async (req, res) => res.status(404).json({ success: false, message: 'Service nicht gefunden' });
