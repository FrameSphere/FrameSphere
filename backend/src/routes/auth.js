import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import { authenticateToken } from '../middleware/auth.js';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/authController.js';

const router = express.Router();

// Register
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name ist erforderlich'),
    body('email').isEmail().withMessage('Gültige E-Mail erforderlich'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Passwort muss mindestens 8 Zeichen lang sein'),
    validate
  ],
  register
);

// Login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Gültige E-Mail erforderlich'),
    body('password').notEmpty().withMessage('Passwort ist erforderlich'),
    validate
  ],
  login
);

// Get current user (protected)
router.get('/me', authenticateToken, getMe);

// Update profile (protected)
router.put(
  '/profile',
  authenticateToken,
  [
    body('name').optional().trim().notEmpty(),
    body('email').optional().isEmail(),
    validate
  ],
  updateProfile
);

// Change password (protected)
router.put(
  '/password',
  authenticateToken,
  [
    body('currentPassword').notEmpty().withMessage('Aktuelles Passwort erforderlich'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('Neues Passwort muss mindestens 8 Zeichen lang sein'),
    validate
  ],
  changePassword
);

export default router;
