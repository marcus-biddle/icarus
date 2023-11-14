import RecentChanges from '../models/RecentChanges.js';
import Pushup from '../models/Pushup.model.js';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

const getPushupSchema = async (res, req) => {
  // When user logs in for the first time, if pushup entry exists do nothing else create it
  // log that the user joined.
  const googleId = req.body.googleId;

  if (!googleId) return res.status(400).json({ error: 'googleId and pushup Count is required' });
  const decodedToken = await jwt.decode(googleId);

  try {
    const user = await User.findOne({ email: decodedToken.email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const foundPushupSchema = await Pushup.find({ user: user._id });

    if (foundPushupSchema) return res.status(200);

    const result = await Pushup.create({
      user: user._id,
      total: 0,
      entries: [],
      experiencePointConversion: 0.1
    })


    await RecentChanges.create({
      action: `${decodedToken.name} joined the site.`,
    });

    return res.status(201);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

  const patchAddPushups = async (req, res) => {
    // update PushupSchema if exists with a new entry.
    const googleId = req.body.googleId;
    const pushupCount = req.body.pushupCount;

    if (!googleId || !pushupCount) return res.status(400).json({ error: 'googleId and pushup Count is required' });
    const decodedToken = await jwt.decode(googleId);

    try {
        const user = await User.findOne({ email: decodedToken.email });

        if (!user) return res.status(404).json({ error: 'User not found' });

        const existingPushupSchema = await Pushup.findOne({ user: userId });

        if (!existingPushupSchema) return res.status(404).json({ error: 'PushupSchema error.' });

        const newEntry = { count };

        // Push the new entry to the entries array
        existingPushupSchema.entries.push(newEntry);

        // // Update the total field based on the sum of counts
        // existingPushupSchema.total = existingPushupSchema.entries.reduce((sum, entry) => sum + entry.count, 0);

        // Save the updated document
        await existingPushupSchema.save();

        await RecentChanges.create({
          action: `${decodedToken.name} completed ${pushupCount} pushup(s).`,
        });

        return res.status(201);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  const getAllPushups = async (req, res) => {
    // This might be entirely incorrect now
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