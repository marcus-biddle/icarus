import LeaderboardControllers from '../controllers/Leaderboard.controller.js'
import express from 'express';

const router = express.Router();

router.get('/api/leaderboard', LeaderboardControllers.getMonthlyLeaderboard);

router.post('/api/leaderboard/update', LeaderboardControllers.updateMonthlyLeaderboard);


export default router;
