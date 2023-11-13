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

        const userId = user._id;

        const result = await Pushup.create({
        user: userId, 
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

  const getAllPushups = async (req, res) => {
    try {
      const pushups = await Pushup.aggregate([
        {
          $group: {
            _id: "$user",
            totalPushups: { $sum: "$count" },
            totalPushupsToday: { $sum: { $cond: { if: { $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$date" } }, { $dateToString: { format: "%Y-%m-%d", date: new Date() } }] }, then: "$count", else: 0 } } },
            pushupsThisWeek: { $sum: { $cond: { if: { $gte: ["$date", new Date(new Date() - 7 * 24 * 60 * 60 * 1000)] }, then: "$count", else: 0 } } },
            pushupsThisMonth: { $sum: { $cond: { if: { $gte: ["$date", new Date(new Date().getFullYear(), new Date().getMonth(), 1)] }, then: "$count", else: 0 } } },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userData",
          },
        },
        {
          $project: {
            _id: 1,
            userName: { $arrayElemAt: ["$userData.username", 0] },
            totalPushups: 1,
            totalPushupsToday: 1,
            pushupsThisWeek: 1,
            pushupsThisMonth: 1,
          },
        },
      ]);
      
      
      return res.json(pushups);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

  const PushupsController = {
    addPushups,
    getAllPushups
  }

  export default PushupsController;