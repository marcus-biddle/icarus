import RecentChanges from '../models/Log.js';
import Pushup from '../models/Pushup.model.js';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

const createPushupSchema = async (req, res) => {
  // When user logs in for the first time, if pushup entry exists do nothing else create it
  // log that the user joined.
  const { googleId } = req.body;

  if (!googleId) return res.status(400).json({ error: 'googleId and pushup Count is required' });
  const decodedToken = await jwt.decode(googleId);

  // return res.json(decodedToken);

  try {
    const user = await User.findOne({ email: decodedToken.email }).lean().exec();
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const foundPushupSchema = await Pushup.findOne({ user: user._id })

    if (foundPushupSchema) return res.status(200).json(foundPushupSchema);

    const newPushup = await Pushup.create({
      user: user._id,
      total: 0,
      entries: [],
      experiencePointConversion: 0.1
    })

    return res.status(201).json(newPushup);
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
        const user = await User.findOne({ email: decodedToken.email }).lean().exec();
        if (!user) return res.status(404).json({ error: 'User not found' });

        const existingPushupSchema = await Pushup.findOneAndUpdate(
          { user: user._id },
          {
            $push: {
              entries: {
                date: new Date(),
                count: pushupCount,
              },
            },
          },
          { new: true } // This option returns the modified document
        );

        if (!existingPushupSchema) return res.status(404).json({ error: 'PushupSchema error.' });

        await RecentChanges.create({
          action: `${decodedToken.name} completed ${pushupCount} pushup(s).`,
        });

        await existingPushupSchema.save();

        return res.status(201).json(existingPushupSchema);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  const getEveryUsersPushupTotals = async (req, res) => {
    // Need to update this to include total somehow
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const pushupsAggregate = await Pushup.aggregate([
        {
          $match: {
            $or: [
              { "entries.date": { $gte: todayStart } },
              { "entries.date": { $gte: startOfMonth } },
            ],
          },
        },
        {
          $unwind: "$entries",
        },
        {
          $match: {
            $or: [
              { "entries.date": { $gte: todayStart } },
              { "entries.date": { $gte: startOfMonth } },
            ],
          },
        },
        {
          $group: {
            _id: "$user",
            totalPushupsToday: {
              $sum: {
                $cond: {
                  if: {
                    $gte: ["$entries.date", todayStart],
                  },
                  then: "$entries.count",
                  else: 0,
                },
              },
            },
            totalPushupsThisMonth: {
              $sum: {
                $cond: {
                  if: {
                    $gte: ["$entries.date", startOfMonth],
                  },
                  then: "$entries.count",
                  else: 0,
                },
              },
            },
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
            totalPushupsToday: 1,
            totalPushupsThisMonth: 1,
          },
        },
      ]);

// console.log(pushupsAggregate);

//       const pushups = await Pushup.aggregate([
//         {
//           $group: {
//             _id: "$user",
//             totalPushups: { $sum: "$count" },
//             totalPushupsToday: { $sum: { $cond: { if: { $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$date" } }, { $dateToString: { format: "%Y-%m-%d", date: new Date() } }] }, then: "$count", else: 0 } } },
//             pushupsThisWeek: { $sum: { $cond: { if: { $gte: ["$date", new Date(new Date() - 7 * 24 * 60 * 60 * 1000)] }, then: "$count", else: 0 } } },
//             pushupsThisMonth: { $sum: { $cond: { if: { $gte: ["$date", new Date(new Date().getFullYear(), new Date().getMonth(), 1)] }, then: "$count", else: 0 } } },
//           },
//         },
//         {
//           $lookup: {
//             from: "users",
//             localField: "_id",
//             foreignField: "_id",
//             as: "userData",
//           },
//         },
//         {
//           $project: {
//             _id: 1,
//             userName: { $arrayElemAt: ["$userData.username", 0] },
//             totalPushups: 1,
//             totalPushupsToday: 1,
//             pushupsThisWeek: 1,
//             pushupsThisMonth: 1,
//           },
//         },
//       ]);

//       console.log(pushupsAggregate);
      
      return res.json(pushupsAggregate);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const getPointConversion = async (req, res) => {
    const defaultConversion = await Pushup.getDefaultExperiencePointConversion();
    return res.status(200).json(defaultConversion);
  }

  const PushupsController = {
    patchAddPushups,
    getEveryUsersPushupTotals,
    createPushupSchema,
    getPointConversion
  }

  export default PushupsController;