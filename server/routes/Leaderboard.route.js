import LeaderboardControllers from '../controllers/Leaderboard.controller.js'
import express from 'express';

const router = express.Router();

router.get('/api/leaderboard', LeaderboardControllers.getLeaderboard);

router.post('/api/setLeaderboard', LeaderboardControllers.setupLeaderboard);

export default router;
