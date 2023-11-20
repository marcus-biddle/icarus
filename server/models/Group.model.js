import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  passcode: {
    type: Number,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Group = mongoose.model('Groups', groupSchema);

export default Group;