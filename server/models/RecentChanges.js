import mongoose from "mongoose";

const recentChangesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (adjust as needed)
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const RecentChanges = mongoose.model('RecentChanges', recentChangesSchema);

export default RecentChanges;
