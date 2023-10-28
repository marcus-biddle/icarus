import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  // Commonly accessed pushup data
  totalPushups: [
    {
      month: {
        type: Number,
        default: new Date().getMonth() + 1, // Default to the current month
      },
      total: {
        type: Number,
        default: 0, // Default to 0 for total pushups
      },
      year: {
        type: Number,
        default: new Date().getFullYear(), // Default to the current year
      },
    },
  ],
  lastPushupDate: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
