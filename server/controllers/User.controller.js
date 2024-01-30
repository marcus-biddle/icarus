import Logs from '../models/Log.model.js';
import User from '../models/User.model.js';
import Leaderboard from '../models/Leaderboard.model.js'
import jwt from 'jsonwebtoken';

// POST to create a new user
const createUser = async (req, res) => {
    const googleId = req.body.googleId;
    const selectedItems = req.body.selectedItems;
    const username = req.body.username;
    const id = req.body.id;

    console.log(googleId, selectedItems, username, id)
    if (!googleId) return res.status(400).json({ error: 'googleId is required' });
    
    const decodedToken = await jwt.decode(googleId);

    const duplicate = await User.findOne({ email: decodedToken.email }).lean().exec();
    if (duplicate) return res.status(200).json(duplicate);

    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString();
      const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
      const allXpSummaries = [];
      
      selectedItems.map(item => {
        const summary = {
            event: item,
            week: [],
            monthSummary: [],
            yearSummary: [
              {
                dateYear: currentYear,
                count: 0,
                months: [
                  {
                    month: currentMonthName,
                    count: 0,
                  }
                ],
              }
            ],
        }
        allXpSummaries.push(summary);
      })

        const user = await User.create({
          name: decodedToken.name,
          email: decodedToken.email,
          googleId: googleId,
          username: username,
          eventIds: selectedItems,
          currentEventId: selectedItems[0],
          id: id,
          leaderboardHistory: [{
            ranking: 0,
            leagueId: 'bronze',
            monthlyXp: 0,
            date: new Date().toLocaleDateString('en-US')
          }],
          currentLeaderboard: {
            ranking: 0,
            leagueId: 'bronze',
            monthlyXp: 0,
          },
          xpSummaries: allXpSummaries
        });

        await addUsersToLeagueHelper('bronze', [{
          ranking: 0,
          name: decodedToken.name,
          xp: 0,
          userId: id,
        }]);

        await Logs.create({
          action: `${decodedToken.name} joined the group.`,
        });

        return res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const addUsersToLeagueHelper = async (leagueId, users) => {
    try {
      const leaderboard = await Leaderboard.findOne();
  
      if (!leaderboard) {
        console.error('Leaderboard not found');
        return;
      }
  
      const leagueGroupIndex = leaderboard.leagueGroups.findIndex(group => group.leagueId === leagueId);
  
      if (leagueGroupIndex === -1) {
        console.error('League not found');
        return;
      }
  
      leaderboard.leagueGroups[leagueGroupIndex].users = [...leaderboard.leagueGroups[leagueGroupIndex].users, ...users];
  
      await leaderboard.save();
    } catch (error) {
      console.error('Error adding users to league:', error);
    }
  };

  // GET user's profile
  const findUser = async (req, res) => {
    const { googleId } = req.query;
    const decodedToken = await jwt.decode(googleId);
    try {
      const foundUser = await User.findOne({ email: decodedToken.email }).lean().exec();;

      if (foundUser) {
        return res.status(200).json(foundUser);
      } else {
        return res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.log('ERR FINDING')
      res.status(500).json({ error: error.message });
    }
  }

  const findAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      return res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const getUserYearArrays = async (req, res) => {
    const { eventId } = req.params;

      try {
        const users = await User.find();
        
        const allUsersYearSummaries = [];
        // put req.body into url, change route, update api folder
        users.forEach((user) => {
          // Assuming xpSummaries is an array of objects as defined in your model
          const userYearSummaries = user.xpSummaries.map((xpSummary) => { 
            if (xpSummary && eventId === xpSummary.event) {
              return xpSummary.yearSummary 
            };
          }).filter((summary) => {
            if (summary !== null || !summary) {
              return summary
            }
          })
          allUsersYearSummaries.push({ userId: user._id, event: eventId, name: user.name ,yearSummaries: userYearSummaries.flat() });
        });
    
        return res.status(200).json(allUsersYearSummaries);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
  };

  const getUserMonthArrays = async (req, res) => {
    const { eventId } = req.params;

      try {
        const users = await User.find();
        
        const allUsersMonthSummaries = [];
        // put req.body into url, change route, update api folder
        users.forEach((user) => {
          // Assuming xpSummaries is an array of objects as defined in your model
          const userMonthSummaries = user.xpSummaries.map((xpSummary) => { 
            if (xpSummary && eventId === xpSummary.event) {
              return xpSummary.monthSummary
            };
          }).filter((summary) => {
            if (summary !== null || !summary) {
              return summary
            }
          })
          allUsersMonthSummaries.push({ userId: user._id, event: eventId, name: user.name , monthSummaries: userMonthSummaries.flat() });
        });
    
        return res.status(200).json(allUsersMonthSummaries);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
  };

  const addFakeUser = async (req, res) => {
    try {  
      // Assuming you have proper validation and error handling in your real implementation
      const user = await User.create(fakeUser);
  
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const fakeUser = {
    eventIds: ['pushups', 'pullups'],
    currentEventId: 'pushups',
    currentEvent: 'pushups',
    email: 'example8@example.com',
    name: 'John Doe8',
    username: 'john_doe3',
    id: 'user12328',
    googleId: 'google123',
    hasGoogleId: true,
    creationDate: 1641975800000, // Example timestamp for January 12, 2022
    weeklyXp: 150,
    monthlyXp: 600,
    totalXp: 3000,
    streak: 5,
    updateCounts: 10,
    streakData: {
      currentStreak: {
        endDate: '01/18/2022',
        lastExtendedDate: '01/15/2022',
        length: 5,
        startDate: '01/14/2022',
      },
      longestStreak: {
        achieveDate: '01/18/2022',
        endDate: '01/20/2022',
        length: 7,
        startDate: '01/14/2022',
      },
      previousStreak: {
        endDate: '01/10/2022',
        lastExtendedDate: '01/08/2022',
        length: 3,
        startDate: '01/05/2022',
      },
    },
    xpGains: [
      {
        event: 'Event1',
        time: 1641975900000, // Example timestamp for January 12, 2022
        totalReps: 20,
        xp: 100,
      },
      {
        event: 'Event2',
        time: 1642075900000, // Example timestamp for January 13, 2022
        totalReps: 15,
        xp: 75,
      },
    ],
    xpSummaries: [
      {
        event: 'pushups',
        week: [
          {
            timestamp: 1642272000000, // Example timestamp for the start of the week
            count: 20,
          },
          // ... additional week data
        ],
        monthSummary: [
          {
            monthName: 'January',
            yearIn: 2024,
            totalCount: 50,
            weeks: [
              {
                weekId: 1,
                count: 25,
              },
              {
                weekId: 2,
                count: 120,
              },
              {
                weekId: 3,
                count: 250,
              },
              {
                weekId: 4,
                count: 250,
              },
              // ... additional week data
            ],
          },
          // ... additional month summary data
        ],
        yearSummary: [
          {
            dateYear: '2024',
            count: 200,
            months: [
              {
                month: 'January',
                count: 20,
              },
              {
                month: 'February',
                count: 200,
              },
              {
                month: 'March',
                count: 150,
              },
              // ... additional month data
            ],
          },
          {
            dateYear: '2023',
            count: 100,
            months: [
              {
                month: 'December',
                count: 50,
              },
              {
                month: 'November',
                count: 200,
              },
              // ... additional month data
            ],
          },
          // ... additional year summary data
        ],
      },
      {
        event: 'pullups',
        week: [
          {
            timestamp: 1642272000000, // Example timestamp for the start of the week
            count: 20,
          },
          // ... additional week data
        ],
        monthSummary: [
          {
            monthName: 'January',
            yearIn: 2024,
            totalCount: 50,
            weeks: [
              {
                weekId: 1,
                count: 15,
              },
              {
                weekId: 2,
                count: 150,
              },
              {
                weekId: 3,
                count: 150,
              },
              {
                weekId: 4,
                count: 750,
              },
              // ... additional week data
            ],
          },
          // ... additional month summary data
        ],
        yearSummary: [
          {
            dateYear: '2024',
            count: 200,
            months: [
              {
                month: 'January',
                count: 100,
              },
              {
                month: 'February',
                count: 150,
              },
              {
                month: 'March',
                count: 150,
              },
              // ... additional month data
            ],
          },
          {
            dateYear: '2023',
            count: 100,
            months: [
              {
                month: 'December',
                count: 50,
              },
              {
                month: 'November',
                count: 200,
              },
              // ... additional month data
            ],
          },
          // ... additional year summary data
        ],
      },
      {
        event: 'running',
        week: [
          {
            timestamp: 1642272000000, // Example timestamp for the start of the week
            count: 20,
          },
          // ... additional week data
        ],
        monthSummary: [
          {
            monthName: 'January',
            yearIn: 2024,
            totalCount: 10,
            weeks: [
              {
                startOfWeekTimestamp: 1640995200000, // Example timestamp for the start of the week
                endOfWeekTimestamp: 1641600000000, // Example timestamp for the end of the week
                count: 15,
              },
              // ... additional week data
            ],
          },
          // ... additional month summary data
        ],
        yearSummary: [
          {
            dateYear: '2024',
            count: 200,
            months: [
              {
                month: 'January',
                count: 10,
              },
              {
                month: 'February',
                count: 15,
              },
              {
                month: 'March',
                count: 100,
              },
              // ... additional month data
            ],
          },
          {
            dateYear: '2023',
            count: 100,
            months: [
              {
                month: 'December',
                count: 50,
              },
              {
                month: 'November',
                count: 200,
              },
              // ... additional month data
            ],
          },
          // ... additional year summary data
        ],
      },
      // ... additional xpSummaries for other events
    ],
  };

  // This assumes every user have a summary pre-made for each of their event
  const updateUserYearSummary = async (req, res) => {
    const count = req.body.count;
    const eventId = req.body.eventId;
    const userId = req.body.userId;

    if (!count || !eventId || !userId) return res.status(400).json({ error: 'eventId, userId, and count required.' }); 

    const user = await User.findOne({ id: userId }).lean().exec();
    if (!user) return res.status(404).json({ error: 'User not found' });

    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString();
      const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
      const eventIndex = user.xpSummaries.findIndex(summary => summary.event === eventId);

      const currentYearSummaryIndex = user.xpSummaries[eventIndex].yearSummary.findIndex(summary => summary.dateYear === currentYear);
      
      
      if (currentYearSummaryIndex !== -1) {
        const currentYearSummary = user.xpSummaries[eventIndex].yearSummary[currentYearSummaryIndex];
        const currentMonthIndex = currentYearSummary.months.findIndex(month => month.month === currentMonthName);

        // Update overall count.
        currentYearSummary.count += count;

        if (currentMonthIndex !== -1) {
          const month = currentYearSummary.months[currentMonthIndex];
          month.count += count;
        }

        if (currentMonthIndex === -1) {
          const newMonth = {
            month: currentMonthName,
            count: count
          }

          currentYearSummary.months.push(newMonth);
        }
      }

      if (currentYearSummaryIndex === -1) {
        const newYearUpdate = {
          dateYear: currentYear,
          count: count,
          months: [{
            month: currentMonthName,
            count: count
          }]
        }

        user.xpSummaries[eventIndex].yearSummary.push(newYearUpdate);
      }

      await User.findOneAndUpdate({ id: userId }, user, { new: true });
      return res.status(201).json(user);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // this function solves the weeks object array problem for monthSummaries
  function getWeekOfMonth() {
    const date = new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay(); // Adjust for Sunday as the first day of the week
    const firstWeekStart = 1 + (7 - dayOfWeek + 1);
  
    const currentDay = date.getDate();
    const weekNumber = Math.ceil((currentDay - firstWeekStart) / 7) + 1;
  
    if (weekNumber >= 5) {
      return 4
    }
    return weekNumber;
  }

  // create updateMonthSummary, add dispatch, update user.
  // maybe add february and other event data too
  const updateUserMonthSummary = async (req, res) => {
    const count = req.body.count;
    const eventId = req.body.eventId;
    const userId = req.body.userId;

    console.log(count)
    if (!count || !eventId || !userId) return res.status(400).json({ error: 'eventId, userId, and count required.' }); 

    const user = await User.findOne({ id: userId }).lean().exec();
    if (!user) return res.status(404).json({ error: 'User not found' });

    try {
      const weekNum = getWeekOfMonth();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString();
      const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);

      // Assume all events are created when user is created.
      const eventIndex = user.xpSummaries.findIndex(summary => summary.event === eventId);
      const currentMonthSummaryIndex = user.xpSummaries[eventIndex].monthSummary.findIndex(summary => summary.monthName === currentMonthName && summary.yearIn === currentYear);
      
      if (currentMonthSummaryIndex !== -1) {
        const weekObj = user.xpSummaries[eventIndex].monthSummary[currentMonthSummaryIndex].weeks.filter(week => week.weekId === weekNum)[0];
        weekObj.count += count;

        user.xpSummaries[eventIndex].monthSummary[currentMonthSummaryIndex].totalCount += count;
      }

      if (currentMonthSummaryIndex === -1) {
        const newMonthObj = {
          monthName: currentMonthName,
          yearIn: currentYear,
          totalCount: count,
          weeks: [
            {
              weekId: 1,
              count: weekNum === 1 ? count : 0
            },
            {
              weekId: 2,
              count: weekNum === 2 ? count : 0
            },
            {
              weekId: 3,
              count: weekNum === 3 ? count : 0
            },
            {
              weekId: 4,
              count: weekNum === 4 ? count : 0
            },
          ]
        }

        user.xpSummaries[eventIndex].monthSummary.push(newMonthObj);
      }

      await User.findOneAndUpdate({ id: userId }, user, { new: true });
      return res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  const UserControllers = {
    createUser,
    findUser,
    findAllUsers,
    addFakeUser,
    getUserYearArrays,
    updateUserYearSummary,
    getUserMonthArrays,
    updateUserMonthSummary
  }

  export default UserControllers;