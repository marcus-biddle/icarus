import MonthlyLeaderboard from '../models/Leaderboard.model.js';
import Logs from '../models/Log.model.js';
import User from '../models/User.model.js';

const getAllLogs = async (req, res) => {
  try {
    const today = new Date();
    // Set the time to the beginning of the day (midnight)
    today.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today.getTime() + 24 * 60 * 60 * 1000); // End of the day (tomorrow's beginning)

    const result = await Logs.find({
      timestamp: {
        $gte: today.getTime(),  // Greater than or equal to today's beginning timestamp
        $lt: endOfDay.getTime() // Less than tomorrow's beginning timestamp
      }
    }).sort({ timestamp: -1 });

    // Get the IDs of logs in the result
    const resultIds = result.map(log => log._id);

    // Delete logs that are not in the result
    await Logs.deleteMany({
      _id: { $nin: resultIds }
    });
    
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLogs = async (req, res) => {
  const action = req.body.action;
  const amount = req.body.amount;
  const event = req.body.event;
  const userId = req.body.userId

  if (!action || !amount || !event || !userId) return res.status(400).json({ error: 'missing information.' });

  const user = await User.findOne({ id: userId });
  if (!user) return res.status(400).json({ error: 'no user found.' });

  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Months are zero-based, so add 1
  const currentYear = today.getFullYear();

  // Find the user in MonthlyLeaderboard for the current month and year
  const board = await MonthlyLeaderboard.findOne({
    userId: user._id,
    month: currentMonth,
    year: currentYear
  }).lean().exec();

  const log = await Logs.create({
    action: action,
    username: user.username,
    amount: amount,
    event: event,
    rank: board ? board.rank : 0
  })

  return res.status(201).json(log);
}

  const LogsController = {
    getAllLogs,
    updateLogs
  }

  export default LogsController;