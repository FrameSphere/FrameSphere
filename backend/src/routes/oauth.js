import express from 'express';
import {
  googleRedirect,
  googleCallback,
  githubRedirect,
  githubCallback,
} from '../controllers/oauthController.js';

const router = express.Router();

// Google
router.get('/google', googleRedirect);
router.get('/google/callback', googleCallback);

// GitHub
router.get('/github', githubRedirect);
router.get('/github/callback', githubCallback);

export default router;
