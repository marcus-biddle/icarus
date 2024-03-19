import MonthlyLeaderboard from "../models/Leaderboard.model.js";
import User from '../models/User.model.js';

const getCurrentMonthYear = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // Months are 0-indexed, so add 1
  const year = now.getFullYear();
  return { month, year };
};

const getMonthlyLeaderboard = async (req, res) => {
  try {
    const { month, year } = getCurrentMonthYear();

    const leaderboard = await MonthlyLeaderboard
      .find({ month, year })
      .sort({ eventCount: -1 }) // Sort by eventCount in descending order
      .populate({
        path: 'userId',
        select: ['id', 'username'] // Select only the 'username' field of the User
      })
      .lean();

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching monthly leaderboard:', error.message);
    return res.status(400).json({ error: error.message });
  }
};

// unused
const getMonthlyLeaderboardWithUsernames = async (month, year) => {
  try {
    let leaderboard = await MonthlyLeaderboard
      .find({ month, year })
      .sort({ eventCount: -1 }) // Sort by eventCount in descending order
      .populate('userId', 'username'); // Populate user's username

    // If leaderboard is empty, return null or empty array
    if (!leaderboard || leaderboard.length === 0) {
      return null; // or return []
    }

    // Optional: Add user's username to each leaderboard entry
    leaderboard = await Promise.all(leaderboard.map(async (entry) => {
      const user = await User.findById(entry.userId);
      return {
        _id: entry._id,
        userId: entry.userId,
        username: user ? user.username : 'Unknown', // Fallback if user not found
        eventId: entry.eventId,
        month: entry.month,
        year: entry.year,
        eventCount: entry.eventCount,
        rank: entry.rank
      };
    }));

    return leaderboard;
  } catch (error) {
    console.error('Error fetching monthly leaderboard with usernames:', error.message);
    throw new Error('Failed to fetch monthly leaderboard with usernames');
  }
};

const getUserEventEntriesTotalReps = async (userId) => {
  try {
    // Get the current date and extract the month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // January is 0, so add 1
    const currentYear = currentDate.getFullYear();

    // MongoDB aggregation pipeline to calculate total reps for the current month
    const totalRepsByEvent = await User.aggregate([
      // Match documents where the userId matches
      { $match: { _id: userId } },
      // Unwind the eventEntries array to work with its elements
      { $unwind: '$eventEntries' },
      // Convert the timestamp to a date object
      {
        $addFields: {
          'eventEntries.date': {
            $toDate: '$eventEntries.time'
          }
        }
      },
      // Match entries for the current month and year
      {
        $match: {
          'eventEntries.date': {
            $gte: new Date(`${currentYear}-${currentMonth}-01`),
            $lt: new Date(`${currentYear}-${currentMonth + 1}-01`)
          }
        }
      },
      // Group by eventId and calculate the total reps
      {
        $group: {
          _id: '$eventEntries.event',
          totalReps: { $sum: '$eventEntries.reps' }
        }
      },
      // Optionally, you can add more stages like sorting or additional calculations
      // {
      //   $sort: { totalReps: -1 } // Sort by total reps in descending order
      // }
    ]);

    return totalRepsByEvent;
  } catch (error) {
    console.error('Error calculating total reps:', error);
    throw error;
  }
};

const updateMonthlyLeaderboard = async (req, res) => {
  const userId = req.body.userId;
  const eventId = req.body.eventId;
  const eventCount = req.body.eventCount;
  const { month, year } = getCurrentMonthYear();

  console.log('UPDATLEAD', eventCount)

  if (!eventCount || !eventId || !userId) return res.status(400).json({ error: 'missing information.' }); 

  const foundUser = await User.findOne({ id: userId }).lean().exec();
  if (!foundUser) return res.status(400).json({ error: 'user not found.' }); 

  try {
    let leaderboardEntry = await MonthlyLeaderboard.findOne({
      userId: foundUser._id,
      eventId: eventId,
      month: month,
      year: year
    });

    const totalReps = (await getUserEventEntriesTotalReps(foundUser._id)).find(entry => entry._id === eventId).totalReps;

    if (!leaderboardEntry) {
      // add up user eventEntries
      // If entry doesn't exist, create a new one
      leaderboardEntry = new MonthlyLeaderboard({
        userId: foundUser._id,
        eventId: eventId,
        month: month,
        year: year,
        eventCount: totalReps
      });
    } else {
      // Update existing entry
      leaderboardEntry.eventCount = totalReps;
    }

    await leaderboardEntry.save();
    // console.log('Monthly leaderboard entry updated:', leaderboardEntry);
    return res.status(201).json(leaderboardEntry);
  } catch (error) {
    console.error('Error updating monthly leaderboard entry:', error.message);
    throw new Error('Failed to update monthly leaderboard entry');
  }
};
const LeaderboardControllers = {
  getMonthlyLeaderboard,
  updateMonthlyLeaderboard
}

export default LeaderboardControllers;