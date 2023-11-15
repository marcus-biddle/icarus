import Logs from '../models/Log.model.js';
import Message from '../models/Message.model.js';

  const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort('-timestamp');
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

  const createMessage = async (req, res) => {
    try {
        const { content } = req.body;
        const newMessage = await Message.create({ content: content });
        await newMessage.save();
        res.status(201).json(newMessage);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

  const MessageController = {
    getMessages,
    createMessage
  }

  export default MessageController;