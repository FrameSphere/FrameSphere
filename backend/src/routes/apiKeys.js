import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { authenticateToken } from '../middleware/auth.js';
import {
  getApiKeys,
  createApiKey,
  updateApiKey,
  deleteApiKey,
  getApiKeyStats
} from '../controllers/apiKeysController.js';

const router = express.Router();

// All API key routes require authentication
router.use(authenticateToken);

// Get all API keys
router.get('/', getApiKeys);

// Create new API key
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name ist erforderlich'),
    body('serviceId').notEmpty().withMessage('Service muss ausgewählt werden').isUUID().withMessage('Ungültige Service ID'),
    body('rateLimit').optional().isInt({ min: 1 }),
    body('expiresInDays').optional().isInt({ min: 1 }),
    validate
  ],
  createApiKey
);

// Update API key
router.put(
  '/:id',
  [
    body('name').optional().trim().notEmpty(),
    body('status').optional().isIn(['active', 'inactive']),
    body('rateLimit').optional().isInt({ min: 1 }),
    validate
  ],
  updateApiKey
);

// Delete API key
router.delete('/:id', deleteApiKey);

// Get API key statistics
router.get('/:id/stats', getApiKeyStats);

export default router;
