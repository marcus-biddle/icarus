
import express from 'express';
import PushupsController from '../controllers/Pushups.controller.js';

const router = express.Router();

router.post('/api/pushups/add', PushupsController.addPushups);

router.get('/api/pushups/all', PushupsController.getAllPushups);

export default router;