import Logs from '../models/Log.model.js';

const getAllLogs = async (req, res) => {
  try {
    const result = await Logs.find({}).sort({ timestamp: -1 });
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateLogs = async (req, res) => {
  const action = req.body.action;
  const amount = req.body.amount;
  const event = req.body.event;
  const username = req.body.username;

  if (!action || !amount || !event || !username) return res.status(400).json({ error: 'missing information.' });

  const log = await Logs.create({
    action: action,
    username: username,
    amount: amount,
    event: event
  })

  return res.status(201).json(log);
}

  const LogsController = {
    getAllLogs,
    updateLogs
  }

  export default LogsController;