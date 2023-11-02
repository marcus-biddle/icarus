import RecentChanges from '../models/RecentChanges.js';
import Pushup from '../models/Pushup.model.js';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

  const addPushups = async (req, res) => {
    const googleId = req.body.googleId;
    const pushupCount = req.body.pushupCount;

    if (!googleId || !pushupCount) return res.status(400).json({ error: 'googleId and pushup Count is required' });
    const decodedToken = await jwt.decode(googleId);

    try {
        const user = await User.findOne({ email: decodedToken.email });

        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }

        // Assuming you have a `userId` retrieved from the user document
        const userId = user._id;

        const result = await Pushup.create({
        user: userId, // Use the ObjectId of the user
        count: pushupCount,
        });

        await RecentChanges.create({
          action: `${decodedToken.name} completed ${pushupCount} pushup(s).`,
        });

        const updatedUser = await User.updateTotalPushups(userId, pushupCount);

        console.log('Total pushups updated:', updatedUser);

        return res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  const PushupsController = {
    addPushups
  }

  export default PushupsController;