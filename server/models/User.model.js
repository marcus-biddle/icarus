import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Commonly accessed pushup data
  totalPushups: [
    {
      month: {
        type: Number,
        default: new Date().getMonth() + 1, // Default to the current month
      },
      total: {
        type: Number,
        default: 0, // Default to 0 for total pushups
      },
      year: {
        type: Number,
        default: new Date().getFullYear(), // Default to the current year
      },
    },
  ],
  lastPushupDate: {
    date: {
      type: Date,
      default: null, // You can set a default value
    },
    count: {
      type: Number,
      default: 0,
    },
  }
});

userSchema.statics.updateTotalPushups = async function (userId, pushupCount) {
  try {
    const user = await this.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Update the total pushups count for the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Check if there's an entry for the current month and year
    const totalPushupsEntry = user.totalPushups.find((entry) => {
      return entry.month === currentMonth && entry.year === currentYear;
    });

    if (totalPushupsEntry) {
      // Update the existing entry
      totalPushupsEntry.total += pushupCount;
    } else {
      // Create a new entry if it doesn't exist
      user.totalPushups.push({
        month: currentMonth,
        total: pushupCount,
        year: currentYear,
      });
    }

    // Save the updated user document
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw new Error('Error updating total pushups: ' + error.message);
  }
};


const User = mongoose.model('User', userSchema);

export default User;
