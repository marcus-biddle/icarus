import LeaderboardControllers from '../controllers/Leaderboard.controller.js'
import express from 'express';

const router = express.Router();

router.get('/api/leaderboard', LeaderboardControllers.getLeaderboard);

router.post('/api/leaderboard/update/xp', LeaderboardControllers.updateLeaderboardXp);

router.post('/api/leaderboard/update/rank', LeaderboardControllers.updateLeaderboardRank);

// use when you want to reset the leaderboard.
router.post('/api/setLeaderboard', LeaderboardControllers.setupLeaderboard);

export default router;
