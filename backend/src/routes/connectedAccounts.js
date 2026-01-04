import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getConnectedAccounts,
  connectAccount,
  refreshAccountStats,
  disconnectAccount
} from '../controllers/connectedAccountsController.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get all connected accounts
router.get('/', getConnectedAccounts);

// Connect a new account
router.post('/', connectAccount);

// Refresh account statistics
router.post('/:id/refresh', refreshAccountStats);

// Disconnect an account
router.delete('/:id', disconnectAccount);

export default router;
