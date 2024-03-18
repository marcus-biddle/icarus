import UserControllers from '../controllers/User.controller.js'
import express from 'express';

const router = express.Router();

// Route for Google Sign-In
router.post('/api/user/create', UserControllers.createUser);
router.post('/api/user/login', UserControllers.fetchUserForLogin);
router.post('/api/users/create/fake', UserControllers.addFakeUser);

// Route to get a user's profile
router.get('/api/users/find', UserControllers.findUser);
router.get('/api/user/:userId', UserControllers.findProfile);

router.get('/api/users/all', UserControllers.findAllUsers);
router.get('/api/users/all/year/:eventId', UserControllers.getUserYearArrays);
router.get('/api/users/all/month/:eventId', UserControllers.getUserMonthArrays);
router.get('/api/users/all/eventEntries', UserControllers.getAllUserXpGains);

router.post('/api/users/update/yearSummary', UserControllers.updateUserYearSummary);
router.post('/api/users/update/monthSummary', UserControllers.updateUserMonthSummary);

router.post('/api/users/update/streak', UserControllers.updateStreak);
router.post('/api/users/update/statistics', UserControllers.updateStatistic);
router.post('/api/users/update/xp', UserControllers.rewardXp);

export default router;
