import mongoose from "mongoose";

const expPointsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
});

const ExperiencePoint = mongoose.model('ExperiencePoints', expPointsSchema);

export default ExperiencePoint;