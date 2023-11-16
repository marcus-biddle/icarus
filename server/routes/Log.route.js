
import express from 'express';
import LogsController from '../controllers/Log.controller.js';

const router = express.Router();

router.get('/api/logs', LogsController.getAllLogs);

export default router;
