import express from 'express';
import { clientInfo, approve, deny, token, getConnections } from '../controllers/ssoController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public: product app fetches client info to render consent UI
router.get('/client-info', clientInfo);

// Public: product exchanges code for user info (server-to-server)
router.post('/token', token);

// Protected: logged-in FrameSphere user approves or denies
router.post('/approve', authenticateToken, approve);
router.post('/deny', authenticateToken, deny);

// Protected: show which products this FrameSphere user has connected
router.get('/connections', authenticateToken, getConnections);

export default router;
