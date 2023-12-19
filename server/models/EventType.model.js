import mongoose from "mongoose";

const eventTypesSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  experiencePointConversion: {
    type: Number,
    required: true,
    default: 0.1
  }
});

const EventType = mongoose.model('EventType', eventTypesSchema);

export default EventType;