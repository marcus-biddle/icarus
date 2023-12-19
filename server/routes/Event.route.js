
import express from 'express';
import EventController from '../controllers/Event.controller.js';

const router = express.Router();

router.put('/api/event', EventController.updateEventForUser);
router.get('/api/event/totals', EventController.getEveryUsersEventTotals);
router.get('/api/event/totals/today', EventController.getTodaysEventForEachUser);
router.get('/api/event/totals/year', EventController.getYearlyMonthlyEventForEachUser);

export default router;