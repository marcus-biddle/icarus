import Logs from '../models/Log.model.js';

  const getAllLogs = async (req, res) => {
    try {
      const result = await Logs.find({});
      return res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const LogsController = {
    getAllLogs
  }

  export default LogsController;