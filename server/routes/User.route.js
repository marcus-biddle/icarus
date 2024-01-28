import UserControllers from '../controllers/User.controller.js'
import express from 'express';

const router = express.Router();

// Route for Google Sign-In
router.post('/api/users/create', UserControllers.createUser);
router.post('/api/users/create/fake', UserControllers.addFakeUser);

// Route to get a user's profile
router.get('/api/users/find', UserControllers.findUser);

router.get('/api/users/all', UserControllers.findAllUsers);
router.get('/api/users/all/year/:eventId', UserControllers.getUserYearArrays);
router.get('/api/users/all/month/:eventId', UserControllers.getUserMonthArrays);

router.post('/api/users/update/yearSummary', UserControllers.updateUserYearSummary);

export default router;
