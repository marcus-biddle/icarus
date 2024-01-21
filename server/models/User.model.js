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

const UserStateSchema = new mongoose.Schema({
  eventIds: [String],
  currentEventId: String,
  currentEvent: String,
  eventTotals: EventTotalsSchema,
  email: String,
  name: String,
  username: String,
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
  streakData: StreakDataSchema,
  xpGains: [XpGainSchema],
  xpSummaries: [XpSummarySchema],
});

const UserModel = mongoose.model('User', UserStateSchema);

export default UserModel;
