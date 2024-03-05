
import express from 'express';
import LogsController from '../controllers/Log.controller.js';

const router = express.Router();

router.get('/api/logs', LogsController.getAllLogs);
router.post('/api/logs/update', LogsController.updateLogs);

export default router;
