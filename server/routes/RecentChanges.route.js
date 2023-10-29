
import express from 'express';
import RecentChangesController from '../controllers/RecentChanges.controller.js';

const router = express.Router();

router.get('/api/changes', RecentChangesController.findAllChanges);

export default router;
