import mongoose from "mongoose";

const CurrentStreakSchema = new mongoose.Schema({
  endDate: String,
  lastExtendedDate: String,
  length: Number,
  startDate: String,
});

const LongestStreakSchema = new mongoose.Schema({
  achieveDate: String,
  endDate: String,
  length: Number,
  startDate: String,
});

const PreviousStreakSchema = new mongoose.Schema({
  endDate: String,
  lastExtendedDate: String,
  length: Number,
  startDate: String,
});

const StreakDataSchema = new mongoose.Schema({
  eventId: String,
  currentStreak: CurrentStreakSchema,
  longestStreak: LongestStreakSchema,
  previousStreak: PreviousStreakSchema,
});

const XpGainSchema = new mongoose.Schema({
  event: String,
  time: Number,
  reps: Number,
  xp: Number,
});

const XpSummarySchema = new mongoose.Schema({
  date: Number,
  gainedXp: Number,
  numUpdateCounts: Number,
  streakExtended: Boolean,
  totalUpdatedCounts: Number,
  userId: Number,
});

const EventTotalsSchema = new mongoose.Schema({
  event: String,
  totalDays: Number,
  totalReps: Number,
  totalXp: Number,
  lastUpdatedDate: String
});

const LeaderboardHistorySchema = new mongoose.Schema({
  ranking: Number,
  count: Number,
  eventId: String,
  monthName: String,
  year: String
});

const LeaderboardSchema = new mongoose.Schema({
  ranking: Number,
  leagueId: String,
  monthlyXp: Number,
});

const StatisticSchema = new mongoose.Schema({
  eventId: String,
  weeklyAverage: Number,
  currentStreak: Number,
  personalBest: Number,
});

const UserStateSchema = new mongoose.Schema({
  eventIds: [String],
  currentEventId: String,
  currentEvent: String,
  eventTotals: EventTotalsSchema,
  email: String,
  name: String,
  username: String,
  level: Number,
  levelCompletionRate: Number,
  xpRequiredForNextLevel: Number,
  id: String,
  googleId: String,
  hasGoogleId: Boolean,
  creationDate: {
    type: Number,
    default: Date.now,
  },
  weeklyXp: Number,
  monthlyXp: Number,
  totalXp: Number,
  streak: Number,
  updateCounts: Number,
  // streakData: [StreakDataSchema],
  streaks: [{
    eventId: String,
    lastExtendedDate: Number,
    streakLength: Number,
    startDate: Number,
  }],
  xpGains: [XpGainSchema],
  xpSummaries: [
    {
      event: String,
      week: [
        {
          timestamp: Number,
          count: Number,
        }
      ],
      monthSummary: [
        {
          monthName: String,
          yearIn: String,
          totalCount: Number,
          weeks: [
            {
              weekId: Number,
              count: Number,
            }
          ],
        }
      ],
      yearSummary: [
        {
          dateYear: String,
          count: Number,
          months: [
            {
              month: String,
              count: Number,
            }
          ],
        }
      ],
    }
  ],
  leaderboardHistory: [LeaderboardHistorySchema],
  currentLeaderboard: LeaderboardSchema,
  statistics: [StatisticSchema]
});

const UserModel = mongoose.model('User', UserStateSchema);

export default UserModel;
