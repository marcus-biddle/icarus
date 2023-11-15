import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema({
  participants: [
    {
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    }
  ],
  duration: {
    type: Number,
    required: true,
    default: 3600 // In seconds for time
  },
  startedDate: {
    type: Date,
    default: Date.now,
  },
  winner: {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
  },
  wager: {
    type: Number,
    required: true,
    default: 0
  },
  completedDate: {
    type: Date,
  }
});

const Challenges = mongoose.model('Challenge', challengeSchema);

export default Challenges;