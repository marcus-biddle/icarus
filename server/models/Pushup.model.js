import mongoose from "mongoose";

const pushupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  count: {
    type: Number,
    required: true,
  },
});

const Pushup = mongoose.model('Pushup', pushupSchema);

export default Pushup;