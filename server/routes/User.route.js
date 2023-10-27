import UserControllers from '../controllers/Users.controller.js'
import express from 'express';

const router = express.Router();

// Route for Google Sign-In
router.post('/api/users', UserControllers.findOrCreateUser);

// Route to get a user's profile
router.get('/profile', UserControllers.findUser);

export default router;
