import mongoose from "mongoose";

const loggerSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
  },
});

const Logs = mongoose.model('RecentChanges', loggerSchema);

export default Logs;
