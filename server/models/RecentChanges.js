import mongoose from "mongoose";

const recentChangesSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
  },
});

const RecentChanges = mongoose.model('RecentChanges', recentChangesSchema);

export default RecentChanges;
