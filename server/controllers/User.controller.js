import Logs from '../models/Log.model.js';
import User from '../models/User.model.js';
import Leaderboard from '../models/Leaderboard.model.js'
import jwt from 'jsonwebtoken';

const thresholds = Array.from({ length: 100 }, (_, index) => Math.floor(100 * Math.pow(index + 1, 1.5)));

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
      // const allEventTotals = [];
      
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

        // const eventTotal = {
        //   event: item,
        //   lastUpdatedDate: new Date().toLocaleDateString('en-US'),
        //   totalDays: 0,
        //   totalReps: 0,
        //   totalXp: 0
        // }

        // allEventTotals.push(eventTotal);
      })

      const statisticsSkeleton = [
        {
          eventId: 'pushups',
          weeklyAverage: 0,
          currentStreak: 0,
          personalBest: 0
        },
        {
          eventId: 'pullups',
          weeklyAverage: 0,
          currentStreak: 0,
          personalBest: 0
        },
        {
          eventId: 'running',
          weeklyAverage: 0,
          currentStreak: 0,
          personalBest: 0
        }
      ]

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
          xpSummaries: allXpSummaries,
          // eventTotals: allEventTotals,
          statistics: statisticsSkeleton,
          level: 1,
          totalXp: 0,
          levelCompletionRate: 0,
          xpRequiredForNextLevel: thresholds[0]
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
      const foundUser = await User.findOne({ email: decodedToken.email }).lean().exec();

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

  const findProfile = async (req, res) => {
    const { userId } = req.params;
    
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    try {
      const foundUser = await User.findOne({ id: userId }).lean().exec();

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

  const updateStatistic = async (req, res) => {
    const count = req.body.count;
    const eventId = req.body.eventId;
    const userId = req.body.userId;
    // get streak and average (put average into redux) from user

    if (!count || !eventId || !userId) return res.status(400).json({ error: 'missing req body variables.' });

    const user = await User.findOne({ id: userId });
    if (!user) return res.status(400).json({ error: 'no user found.' });

    try {
      const weekNum = getWeekOfMonth();
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear().toString();
      const currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);

      const statsIndex = user.statistics.findIndex(stat => stat.eventId === eventId);
      const streakIndex = user.streaks.findIndex(streak => streak.eventId === eventId);

      if (statsIndex === -1) return res.status(400).json({ error: `no index found. looking for ${eventId}` });

      const currentPersonalBest = user.statistics[statsIndex].personalBest;
      const currentStreak = user.streaks[streakIndex].streakLength || 1;

      const best = currentPersonalBest > count ? currentPersonalBest : count
      
      const summaryIndex = user.xpSummaries.findIndex(summary => summary.event === eventId); // fix event to eventId for consistency
      const monthIndex = user.xpSummaries[summaryIndex].monthSummary.findIndex(month => month.monthName === currentMonthName && month.yearIn === currentYear);
      const weekIndex = user.xpSummaries[summaryIndex].monthSummary[monthIndex].weeks.findIndex(week => week.weekId === weekNum);
      const weekCount = user.xpSummaries[summaryIndex].monthSummary[monthIndex].weeks[weekIndex].count || 0;
      const weeklyAverage = weekCount === 0 ? 0 : weekCount / 7;

      const updatedUser = await User.findOneAndUpdate(
        {
          id: userId,
          'statistics.eventId': eventId
        },
        {
          $set: {
            'statistics.$.weeklyAverage': weeklyAverage,
            'statistics.$.currentStreak': currentStreak,
            'statistics.$.personalBest': best,
          },
        },
        { new: true }
      );

      if (!updatedUser) return res.status(404).json({ error: 'updatedUser error.' });

      // console.log(updatedUser)
      return res.status(201).json(updatedUser);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const updateStreak = async (req, res) => {
    const eventId = req.body.eventId;
    const userId = req.body.userId;

    if (!eventId || !userId) return res.status(400).json({ error: 'missing req body variables.' });

    const user = await User.findOne({ id: userId }).lean().exec();
    if (!user) return res.status(400).json({ error: 'no user found.' });

    try {
      const eventIndex = user.streaks.findIndex(streak => streak.eventId === eventId);

      if (eventIndex === -1) {
        console.log('eventId not found')
        const newStreak = {
          eventId: eventId,
          lastExtendedDate: new Date().getTime(),
          streakLength: 0,
          startDate: new Date().getTime()
        }

        await User.findOneAndUpdate(
          { id: userId },
          { $push: { streaks: newStreak } },
          { new: true }
        );

        return res.status(200).json({ message: 'Streak updated successfully.' });
      }

      if (eventId !== -1) {
        console.log('eventId found')
        const streak = user.streaks[eventIndex];

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const startOfYesterday = currentDate.getTime() - 24 * 60 * 60 * 1000;
        const isYesterday = streak.lastExtendedDate >= startOfYesterday;
        const sameDay = streak.lastExtendedDate === currentDate.getTime();
        console.log(isYesterday, 'isYester', startOfYesterday, new Date(currentDate.getTime()), new Date(streak.lastExtendedDate) )
        if (sameDay) return res.status(200).json({ message: 'Streak updated successfully.' });
        if (isYesterday) {
          await User.findOneAndUpdate(
            { 
              id: userId,
              'streaks.eventId': eventId,
            },
            {
              $set: {
                'streaks.$.lastExtendedDate': currentDate.getTime(),
                'streaks.$.streakLength': streak.streakLength + 1,
              },
            },
            { new: true }
          );
        } else {
          console.log('changing streak back')
          await User.findOneAndUpdate(
            { 
              id: userId,
              'streaks.eventId': eventId,
            },
            {
              $set: {
                'streaks.$.lastExtendedDate': currentDate.getTime(),
                'streaks.$.streakLength': 0,
                'streaks.$.startDate': currentDate.getTime(),
              },
            },
            { new: true }
          );
        }

        return res.status(200).json({ message: 'Streak updated successfully.' });
      }

      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  function calculateLevel(xp) {
    // Define XP thresholds for each level
    
    const levelOverview = {
      level: 1,
      levelCompletionRate: xp / thresholds[1],
      xpRequiredForNextLevel: thresholds[0]
    } 
    // Find the highest level whose threshold is less than or equal to the user's XP
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (xp >= thresholds[i]) {
        levelOverview.level = i + 2;
        levelOverview.levelCompletionRate = (xp / thresholds[i + 1]);
        levelOverview.xpRequiredForNextLevel= thresholds[i + 1]
        return levelOverview; // Levels are usually 1-based
      }
    }
  
    return levelOverview; // Default to level 1 if XP is less than the lowest threshold
  }

  function calculateXp(eventId, reps) {
    // Define XP values for each eventId
    const xpValues = {
      pushups: 0.5,
      running: 3.33,
      pullups: 1,
      // Add more eventId-XP mappings as needed
    };
  
    // Get the XP value for the specific eventId
    const xp = xpValues[eventId] || 0;
  
    // Calculate total XP based on reps and eventId-specific XP
    const totalXp = reps * xp;
  
    return totalXp;
  }

  const rewardXp = async (req, res) => {
    const eventId = req.body.eventId;
    const userId = req.body.userId;
    const count = req.body.count

    if (!eventId || !userId || !count) return res.status(400).json({ error: 'missing req body variables.' });

    const user = await User.findOne({ id: userId }).lean().exec();
    if (!user) return res.status(400).json({ error: 'no user found.' });

    try {
      const userXP = calculateXp(eventId, count);
      const levelOverview = calculateLevel(user.totalXp + userXP);

      await User.findOneAndUpdate(
        { id: userId },
        {
          $push: {
              xpGains: {
                event: eventId,
                time: Date.now(),
                reps: count,
                xp: userXP
              }
          },
        },
        { new: true }
      );

      const updatedUser = await User.findOneAndUpdate(
        { id: userId },
        {
          $set: {
            totalXp: user.totalXp + userXP, // Update totalXp
            level: levelOverview.level, // Update level
            levelCompletionRate: levelOverview.levelCompletionRate,
            xpRequiredForNextLevel: levelOverview.xpRequiredForNextLevel
          },
        },
        { new: true }
      );

      return res.status(200).json(updatedUser);

    } catch (error) {
      res.status(500).json({ error: error.message });
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
    updateUserMonthSummary,
    findProfile,
    updateStreak,
    updateStatistic,
    rewardXp
  }

  export default UserControllers;