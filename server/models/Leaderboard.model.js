import mongoose from "mongoose";

const { Schema } = mongoose;

const MonthlyLeaderboardSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ranking: Number,
  count: Number,
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});

// Indexes for efficient queries
MonthlyLeaderboardSchema.index({ month: 1, year: 1 });
MonthlyLeaderboardSchema.index({ user: 1, month: 1, year: 1 });

const LeaderboardHistory = mongoose.model('MonthlyLeaderboard', MonthlyLeaderboardSchema);

export default LeaderboardHistory;