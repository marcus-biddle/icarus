import mongoose from "mongoose";

const loggerSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    default: Date.now,
  },
  action: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  event: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  rank: {
    type: Number,
    required: true
  },
});

const Logs = mongoose.model('Logs', loggerSchema);

export default Logs;
