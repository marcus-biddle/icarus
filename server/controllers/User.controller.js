import RecentChanges from '../models/Log.js';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

// POST to retreive user or create a new user
const createUser = async (req, res) => {
    const googleId = req.body.googleId;
    if (!googleId) return res.status(400).json({ error: 'googleId is required' });
    
    const decodedToken = await jwt.decode(googleId);

    const duplicate = await User.findOne({ email: decodedToken.email }).lean().exec();
    if (duplicate) return res.status(200).json(duplicate);

    try {
        const user = await User.create({
          username: decodedToken.name,
          email: decodedToken.email,
        });

        await RecentChanges.create({
          action: `${decodedToken.name} joined the group.`,
        });

        return res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // GET user's profile
  const findUser = async (req, res) => {
    const { googleId } = req.query;
    const decodedToken = await jwt.decode(googleId);
    try {
      const foundUser = await User.findOne({ email: decodedToken.email }).lean().exec();;

      if (foundUser) {
        return res.status(200).json(foundUser);
      } else {
        return res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.log('ERR FINDING')
      res.status(500).json({ error: error.message });
    }
  }

  const findAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      return res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const UserControllers = {
    createUser,
    findUser,
    findAllUsers
  }

  export default UserControllers;