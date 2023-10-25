import UserControllers from '../controllers/Users.controller.js'
import express from 'express';
require('../middleware/googleSignInMiddleware'); // Import middleware for Google Sign-In

const router = express.Router();

// Route for Google Sign-In
router.post('/google-signin', googleSignInMiddleware, UserControllers.findOrCreateUser);

// Route to get a user's profile
router.get('/profile', UserControllers.findUser);

export default router;
