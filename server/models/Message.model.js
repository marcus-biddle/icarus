import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String
  }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;