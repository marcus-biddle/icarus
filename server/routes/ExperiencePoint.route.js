import express from 'express';
import ExperiencePointController from '../controllers/ExperiencePoint.controller.js';

const router = express.Router();

// router.put('/api/points/create', ExperiencePointController.addPoints);

router.post('/api/points/get', ExperiencePointController.getUserPoints);

export default router;
