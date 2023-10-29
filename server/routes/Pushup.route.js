
import express from 'express';
import PushupsController from '../controllers/Pushups.controller.js';

const router = express.Router();

router.post('/api/pushups/add', PushupsController.addPushups);

export default router;