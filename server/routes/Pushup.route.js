
import express from 'express';
import PushupsController from '../controllers/Pushups.controller.js';

const router = express.Router();

router.post('/api/pushups/create', PushupsController.createPushupSchema);

router.patch('/api/pushups/update/add', PushupsController.patchAddPushups);

router.get('/api/pushups/get/all', PushupsController.getEveryUsersPushupTotals);

export default router;