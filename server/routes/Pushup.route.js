
import express from 'express';
import PushupsController from '../controllers/Pushup.controller.js';

const router = express.Router();

router.post('/api/pushups/create', PushupsController.createPushupSchema);

router.patch('/api/pushups/update/add', PushupsController.patchAddPushups);

router.get('/api/pushups/get/all', PushupsController.getEveryUsersPushupTotals);

router.get('/api/pushups/point-value', PushupsController.getPointConversion);

export default router;