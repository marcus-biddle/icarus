import UserControllers from '../controllers/User.controller.js'
import express from 'express';

const router = express.Router();

// Route for Google Sign-In
router.post('/api/users/create', UserControllers.createUser);

// Route to get a user's profile
// router.get('/api/users/find', UserControllers.findUser);

router.get('/api/users/all', UserControllers.findAllUsers);

export default router;
