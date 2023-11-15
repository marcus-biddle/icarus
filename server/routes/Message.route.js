import express from 'express';
import MessageController from '../controllers/Message.controller.js';

const router = express.Router();

router.get('/api/messages', MessageController.getMessages);

router.post('/api/messages', MessageController.createMessage);

export default router;