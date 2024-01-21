import LeaderboardModel from '../models/Leaderboard.model.js'

const fakeLeaderboardData = {
    leagueIds: ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster'],
    leagueGroups: [
      {
        leagueId: 'bronze',
        users: [
          
        ],
      },
      {
        leagueId: 'silver',
        users: [
         
        ],
      },
      {
        leagueId: 'gold',
        users: [
         
        ],
      },
      {
        leagueId: 'platinum',
        users: [
         
        ],
      },
      {
        leagueId: 'diamond',
        users: [
         
        ],
      },
      {
        leagueId: 'master',
        users: [
         
        ],
      },
      {
        leagueId: 'grandmaster',
        users: [
         
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

const LeaderboardControllers = {
    getLeaderboard,
    setupLeaderboard
  }

  export default LeaderboardControllers;