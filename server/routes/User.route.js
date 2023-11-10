import UserControllers from '../controllers/Users.controller.js'
import express from 'express';

const router = express.Router();

// Route for Google Sign-In
router.post('/api/create/user', UserControllers.findOrCreateUser);

// Route to get a user's profile
router.get('/api/user-list/user', UserControllers.findUser);

router.get('/api/user-list', UserControllers.findAllUsers);

export default router;
