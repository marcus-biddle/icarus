import mongoose from "mongoose";

const pushupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  entries: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      count: {
        type: Number,
        required: true,
      },
    }
  ],
  experiencePointConversion: {
    type: Number,
    required: true,
    default: 0.1
  }
});

const Pushup = mongoose.model('Pushup', pushupSchema);

export default Pushup;