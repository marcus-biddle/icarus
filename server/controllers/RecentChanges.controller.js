import RecentChanges from '../models/RecentChanges.js';

  const findAllChanges = async (req, res) => {
    try {
      const result = await RecentChanges.find({});
      return res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const RecentChangesController = {
    findAllChanges
  }

  export default RecentChangesController;