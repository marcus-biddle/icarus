import mongoose from "mongoose";

const ExperiencePointSchema = new mongoose.Schema({
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

const ExperiencePoint = mongoose.model('ExperiencePoint', ExperiencePointSchema);

export default ExperiencePoint;