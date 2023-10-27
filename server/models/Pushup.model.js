const mongoose = require('mongoose');

const pushupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  }
});

const Pushup = mongoose.model('Pushup', pushupSchema);

module.exports = Pushup;
