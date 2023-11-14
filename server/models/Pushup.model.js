import mongoose from "mongoose";

const pushupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  entries: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      count: {
        type: Number,
        required: true,
      },
    }
  ],
  experiencePointConversion: {
    type: Number,
    required: true,
    default: 0.1
  }
});

// Define a pre-save middleware to update the total before saving
pushupSchema.pre('save', function (next) {
  // Sum the counts from all entries and update the total
  this.total = this.entries.reduce((acc, entry) => acc + entry.count, 0);

  next(); // Continue with the save operation
});

const Pushup = mongoose.model('Pushup', pushupSchema);

export default Pushup;