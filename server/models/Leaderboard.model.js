import mongoose from "mongoose";

const { Schema } = mongoose;

const monthlyLeaderboardSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  month: Number,
  year: Number,
  eventId: {
    type: String,
    required: true
  },
  eventCount: Number,
  rank: {
    type: Number,
    default: 0
  }
});

// Pre-save hook to calculate and update the rank based on eventCount
monthlyLeaderboardSchema.pre('save', async function (next) {
  try {
    const count = await this.model('MonthlyLeaderboard').countDocuments({
      $and: [
        { month: this.month },
        { year: this.year },
        { eventId: this.eventId },
        { eventCount: { $gt: this.eventCount } } // Count entries with higher eventCount
      ]
    });
    this.rank = count + 1; // Calculate rank based on count of higher eventCounts
    next();
  } catch (error) {
    next(error);
  }
});

const MonthlyLeaderboard = mongoose.model('MonthlyLeaderboard', monthlyLeaderboardSchema);

export default MonthlyLeaderboard;