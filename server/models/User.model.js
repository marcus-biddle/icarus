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
  totalPushups: {
    type: Number,
    default: 0,
  },
  lastPushupDate: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
