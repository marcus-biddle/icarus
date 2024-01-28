import LeaderboardModel from '../models/Leaderboard.model.js'

const fakeLeaderboardData = {
  leagueIds: ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster'],
  leagueGroups: [
    {
      leagueId: 'bronze',
      users: [
        { ranking: 1, name: 'User1', xp: 100, userId: 'id1' },
        { ranking: 2, name: 'User2', xp: 900, userId: 'id2' },
        { ranking: 3, name: 'User3', xp: 1200, userId: 'id3' },
      ],
    },
    {
      leagueId: 'silver',
      users: [
        { ranking: 1, name: 'User4', xp: 120, userId: 'id4' },
        { ranking: 2, name: 'User5', xp: 110, userId: 'id5' },
        { ranking: 3, name: 'User6', xp: 100, userId: 'id6' },
        { ranking: 4, name: 'User7', xp: 95, userId: 'id7' },
      ],
    },
    {
      leagueId: 'gold',
      users: [
        { ranking: 1, name: 'User8', xp: 150, userId: 'id8' },
        { ranking: 2, name: 'User9', xp: 140, userId: 'id9' },
        // Add more users for gold league if needed
      ],
    },
    {
      leagueId: 'platinum',
      users: [
        { ranking: 1, name: 'User10', xp: 180, userId: 'id10' },
        { ranking: 2, name: 'User11', xp: 170, userId: 'id11' },
        // Add more users for platinum league if needed
      ],
    },
    {
      leagueId: 'diamond',
      users: [
        { ranking: 1, name: 'User12', xp: 220, userId: 'id12' },
        { ranking: 2, name: 'User13', xp: 210, userId: 'id13' },
        // Add more users for diamond league if needed
      ],
    },
    {
      leagueId: 'master',
      users: [
        { ranking: 1, name: 'User14', xp: 260, userId: 'id14' },
        // Add more users for master league if needed
      ],
    },
    {
      leagueId: 'grandmaster',
      users: [
        { ranking: 1, name: 'User15', xp: 300, userId: 'id15' },
        // Add more users for grandmaster league if needed
      ],
    },
  ],
};

  const setupLeaderboard = async () => {
    try {
      // Remove existing data
      await LeaderboardModel.deleteMany();
  
      // Create new Leaderboard data
      const leaderboard = new LeaderboardModel(fakeLeaderboardData);
  
      // Save to the database
      await leaderboard.save();
  
      console.log('Leaderboard set up successfully!');
    } catch (error) {
      console.error('Error setting up Leaderboard:', error);
    }
  };
// Controller function to get the Leaderboard
const getLeaderboard = async (req, res) => {
  try {
    // Fetch the Leaderboard from the database
    const leaderboard = await LeaderboardModel.findOne();

    if (!leaderboard) {
      return res.status(404).json({ message: 'Leaderboard not found' });
    }

    // Return the Leaderboard as JSON response
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateLeaderboardXp = async (req, res) => {
  const newXp = req.body.xpGain;
  const userId = req.body.userId

  try {
    const updatedLeaderboard = await LeaderboardModel.findOneAndUpdate(
      {
        'leagueGroups.users.userId': userId
      },
      {
        $set: {
          'leagueGroups.$[group].users.$[user].xp': newXp
        }
      },
      {
        arrayFilters: [
          { 'group.users.userId': userId },
          { 'user.userId': userId }
        ],
        new: true
      }
    );

    // const updatedRanks = await updateRanks();

    return res.json(updatedLeaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLeaderboardRank = async (req, res) => {
  try {
    const updatedLeaderboard = await updateLeaderboardRanking();

    return res.json({ updatedLeaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLeaderboardRanking = async () => {
  try {
    const updatedLeaderboard = await LeaderboardModel.aggregate([
      {
        $unwind: '$leagueGroups',
      },
      {
        $unwind: '$leagueGroups.users',
      },
      {
        $sort: {
          'leagueGroups.users.xp': -1,
        },
      },
      {
        $group: {
          _id: '$leagueGroups.leagueId',
          users: {
            $push: {
              ranking: '$leagueGroups.users.ranking',
              name: '$leagueGroups.users.name',
              xp: '$leagueGroups.users.xp',
              userId: '$leagueGroups.users.userId',
            },
          },
        },
      },
      {
        $unwind: '$users',
      },
      {
        $set: {
          'users.ranking': { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id',
          users: {
            $push: '$users',
          },
          leagueId: { $first: '$_id' },
        },
      },
      {
        $group: {
          _id: null,
          leagueGroups: {
            $push: {
              leagueId: '$leagueId',
              users: '$users',
            },
          },
          leagueIds: {
            $push: '$leagueId',
          },
        },
      },
    ]);
    
    // Update the rankings based on array position
    updatedLeaderboard[0]?.leagueGroups.forEach((group) => {
      group.users.forEach((user, index) => {
        user.ranking = index + 1;
      });
    });
    
    
    
    
    
    console.log(updatedLeaderboard)

    if (!updatedLeaderboard || !updatedLeaderboard[0]) {
      throw new Error('Failed to update leaderboard ranking.');
    }

    for (const group of updatedLeaderboard[0].leagueGroups) {
      await LeaderboardModel.findOneAndUpdate(
        { 'leagueGroups.leagueId': group.leagueId },
        { $set: { 'leagueGroups.$.users': group.users } },
        { new: true }
      );
    }

    console.log('Leaderboard ranking updated successfully.');

    const leaderboard = await LeaderboardModel.findOne();
    return leaderboard
  } catch (error) {
    console.error('Error updating leaderboard ranking:', error);
  }
};

const LeaderboardControllers = {
    getLeaderboard,
    setupLeaderboard,
    updateLeaderboardXp,
    updateLeaderboardRank
  }

  export default LeaderboardControllers;