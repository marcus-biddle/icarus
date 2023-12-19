import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventTypes',
  },
  total: {
    type: Number,
    required: true,
    default: 0
  },
  totalDaysCount: {
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
});

EventSchema.pre('save', function (next) {
  // Extract unique dates from entries
  const uniqueDates = new Set(this.entries.map(entry => entry.date.toDateString()));

  // Update totalDaysCount with the count of unique dates
  this.totalDaysCount = uniqueDates.size;

  // Calculate the total by summing counts from all entries
  const newTotal = this.entries.reduce((acc, entry) => acc + entry.count, 0);

  // Update the total field
  this.total = newTotal;

  // Continue with the save operation
  next();
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
