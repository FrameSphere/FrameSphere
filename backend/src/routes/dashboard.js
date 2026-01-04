import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getDashboardStats,
  getUsageHistory,
  getServiceBreakdown
} from '../controllers/dashboardController.js';

const router = express.Router();

// All dashboard routes require authentication
router.use(authenticateToken);

// Get dashboard statistics
router.get('/stats', getDashboardStats);

// Get usage history
router.get('/usage-history', getUsageHistory);

// Get service breakdown
router.get('/service-breakdown', getServiceBreakdown);

export default router;
