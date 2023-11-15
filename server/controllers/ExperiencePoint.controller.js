import ExperiencePoint from '../models/ExperiencePoint.model.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import Pushup from '../models/Pushup.model.js';
import Logs from '../models/Log.model.js';

  const addPoints = async (req, res) => {
    const { googleId, points } = req.body;

    if (!googleId || !points) return res.status(400).json({ error: 'googleId and points is required' });
    const decodedToken = await jwt.decode(googleId);

    try {
        const user = await User.findOne({ email: decodedToken.email }).lean().exec();
        if (!user) return res.status(404).json({ error: 'User not found' });

        const defaultConversionResult = await Pushup.aggregate([
          {
            $group: {
              _id: null,
              defaultConversion: { $first: "$experiencePointConversion" },
            },
          },
        ]);

        const defaultConversion = defaultConversionResult.length > 0
          ? defaultConversionResult[0].defaultConversion
          : 0; // Assuming 0 as a default value if not found

        const userPoints = await ExperiencePoint.findOne({ user: user._id })
        // Add points to the total
        const updatedPoints = (isNaN(points) ? 0 : points) * (isNaN(defaultConversion) ? 0 : defaultConversion) + (!userPoints ? 0 : userPoints.total);
        // expPoints.total += updatedPoints;

        const expPoints = await ExperiencePoint.findOneAndUpdate({ user: user._id}, { total: updatedPoints})

        if (!expPoints) {
          const result = await ExperiencePoint.create({ user: user._id, total: updatedPoints });
          
          await Logs.create({
            action: `${decodedToken.name} recieved ${updatedPoints} point(s).`,
          });
          
          return res.status(200).json(result);
        }

        await Logs.create({
          action: `${decodedToken.name} recieved ${updatedPoints} point(s).`,
        });

        return res.status(200).json(expPoints);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const getUserPoints = async (req, res) => {
    const { googleId } = req.body;

    if (!googleId) return res.status(400).json({ error: 'googleId is required' });
    const decodedToken = await jwt.decode(googleId);

    try {
        const user = await User.findOne({ email: decodedToken.email }).lean().exec();
        if (!user) return res.status(404).json({ error: 'User not found' });

        const expPoints = await ExperiencePoint.findOne({ user: user._id }).lean().exec();

        if (!expPoints) return res.status(400).json({error: 'Error, cannot find points.'})

        return res.status(200).json(expPoints);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const ExperiencePointController = {
    addPoints,
    getUserPoints
  }

  export default ExperiencePointController;