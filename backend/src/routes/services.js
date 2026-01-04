import express from 'express';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import {
  getAllServices,
  getServiceById,
  getUserServices,
  checkServiceAccess,
  requestServiceAccess
} from '../controllers/servicesController.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllServices);
router.get('/:id', optionalAuth, getServiceById);

// Protected routes
router.get('/user/my-services', authenticateToken, getUserServices);
router.get('/:serviceId/access', authenticateToken, checkServiceAccess);
router.post('/access/request', authenticateToken, requestServiceAccess);

export default router;
