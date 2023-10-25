const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

module.exports = User;
