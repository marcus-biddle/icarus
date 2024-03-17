import MonthlyLeaderboard from '../models/Leaderboard.model.js';
import Logs from '../models/Log.model.js';
import User from '../models/User.model.js';

const getAllLogs = async (req, res) => {
  try {
    const result = await Logs.find().sort({ timestamp: -1 });
    
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