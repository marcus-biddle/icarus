import jwt from 'jsonwebtoken';
import Message from '../models/Message.model.js';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: "1708527",
  key: "f8dcf3aa8d196d37cba1",
  secret: "0f343129da4d952a0a66",
  cluster: "us2",
  useTLS: true
});

  const getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort('-timestamp');
        res.json(messages);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }

  const createMessage = async (req, res) => {
    const { content, googleId } = req.body;
    if (!googleId) return res.status(400).json({ error: 'googleId and pushup Count is required' });
    const decodedToken = await jwt.decode(googleId);

    try {
        const newMessage = await Message.create({ content: content, username: decodedToken.name });
        await newMessage.save();

        pusher.trigger("chat", "message", {
          message: content,
          username: decodedToken.name
        });

        return res.status(201).json(newMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const MessageController = {
    getMessages,
    createMessage
  }

  export default MessageController;