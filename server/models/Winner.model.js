import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

const Winner = mongoose.model('Winners', winnerSchema);

export default Winner;