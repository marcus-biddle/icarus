import User from '../models/User.model.js';

// POST to retreive user or create a new user
const findOrCreateUser = async (req, res) => {
    try {
      // The user has successfully signed in with Google.
      // You can now create a user profile or retrieve an existing one.
  
      // Assuming you have the user's Google ID available in the request:
      const googleId = req.googleId;
      const username = req.username; // build an input so user can create name

      return res.json({ googleId: googleId, username: username})
  
      // Check if the user with this Google ID already exists in your database.
      // const user = await User.findOne({ googleId });
  
      // if (user) {
      //   // User exists, return the user's profile.
      //   return res.status(200).json(user);
      // } else {
      //   // User doesn't exist, create a new user profile.
      //   const newUser = new User({
      //     username: username,
      //     googleId: googleId,
      //     // Other user profile information here...
      //   });
      //   await newUser.save();
      //   return res.status(201).json(newUser);
      // }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // GET user's profile
  const findUser = async (req, res) => {
    try {
      // Assuming you have a middleware that authenticates the user and attaches their profile to the request.
      const user = req.user; // Retrieve the user's profile from the request.
  
      if (user) {
        console.log(user)
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const UserControllers = {
    findOrCreateUser,
    findUser
  }

  export default UserControllers;