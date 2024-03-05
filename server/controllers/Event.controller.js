import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import Event from '../models/Event.model.js';
import EventTypes from '../models/EventType.model.js';
import Logs from '../models/Log.model.js';
import ExperiencePoint from '../models/ExperiencePoint.model.js';

const updateEventForUser = async (req, res) => {
  const { googleId, event, count } = req.body;

  if (!googleId || !event || !count) return res.status(400).json({ error: 'googleId, count, and event is required.' });
  const events = ['pushup', 'pullup', 'running'];
  if (events.includes(event) !== true) return res.status(400).json({ error: 'event is not valid.' });

  const decodedToken = await jwt.decode(googleId);
  const eventExist = await EventTypes.findOne({ type: event }).lean().exec();
  const exp = event === 'pushup' ? 0.2 : event === 'pullup' ? 1 : 1.5;

  if (!eventExist) {
    try {
        
        await EventTypes.create({
            type: event,
            experiencePointConversion: exp
        })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  }

  try {
    const user = await User.findOne({ email: decodedToken.email }).lean().exec();
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    const foundEvent = await Event.findOne({ user: user._id, event: eventExist._id }).lean().exec();

    if (!foundEvent) {
        const newEvent = await Event.create({
            user: user._id,
            event: eventExist._id,
            entries: {
                count: count
            },
        })

        const log = await Logs.create({
          action: "completed",
          amount: count,
          event: eventExist._id,
          username: user.username
        })

        console.log(log);

        return res.status(201).json(newEvent);
    }

    const existingEvent = await Event.findOneAndUpdate(
        { user: user._id, event: eventExist._id },
        {
          $push: {
            entries: {
              date: new Date(),
              count: count,
            },
          },
        },
        { new: true } // This option returns the modified document
      );

      await existingEvent.save();
    
      // await Logs.create({
      //   action: `${decodedToken.name} completed ${count} ${event === 'running' ? count > 1 ? 'miles' : 'mile' : count > 1 ? `${event}s` : event}.`,
      // });

      const collectedExp = count * exp;

      const expFound = await ExperiencePoint.findOne({ user: user._id }).lean().exec();

      if (!expFound) {
        await ExperiencePoint.create({
            user: user._id,
            total: collectedExp
        })
      } else {
        await ExperiencePoint.findOneAndUpdate(
            { user: user._id },
            { total: expFound.total + collectedExp },
        )
      }

      const log = await Logs.create({
        action: "completed",
        amount: count,
        event: eventExist._id,
        username: user.username
      })

      console.log(log);

    return res.status(201).json(existingEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getEveryUsersEventTotals = async (req, res) => {
    try {
        const eventTotals = await Event.aggregate([
            {
              $group: {
                _id: { user: '$user', event: '$event' },
                eventTotal: { $sum: '$total' },
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: '_id.user',
                foreignField: '_id',
                as: 'userData',
              },
            },
            {
              $lookup: {
                from: 'eventtypes',
                localField: '_id.event',
                foreignField: '_id',
                as: 'eventData',
              },
            },
            {
              $project: {
                _id: 1,
                userName: { $arrayElemAt: ['$userData.username', 0] },
                eventType: { $arrayElemAt: ['$eventData.type', 0] },
                eventTotal: 1,
              },
            },
          ]);

          const aggregatedData = {};

    // Iterate through the eventData
    eventTotals.forEach((entry) => {
      const userName = entry.userName;
      const eventName = entry.eventType;
      const eventTotal = entry.eventTotal;

      // If userName already exists in aggregatedData, update the existing entry
      if (aggregatedData[userName]) {
        const userEntry = aggregatedData[userName];

        // Check if the event already exists for the user, update total
        const existingEvent = userEntry.events.find((event) => event.eventName === eventName);
        if (existingEvent) {
          existingEvent.total += eventTotal;
        } else {
          // If the event doesn't exist, create a new entry
          userEntry.events.push({ eventName, total: eventTotal });
        }
      } else {
        // If userName doesn't exist, create a new entry
        aggregatedData[userName] = { userName, events: [{ eventName, total: eventTotal }] };
      }
    });

    // Convert the values of the aggregatedData object to an array
    const resultArray = Object.values(aggregatedData);
  
      return res.status(201).json(resultArray);
    } catch (error) {
      console.error('Error getting event totals:', error);
      throw error; // You might want to handle or log the error appropriately
    }
  };

  const getTodaysEventForEachUser = async (req, res) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const todaysEvents = await Event.aggregate([
            {
                $match: {
                    "entries.date": {
                        $gte: todayStart,
                        $lte: todayEnd,
                    },
                },
            },
            {
                $unwind: "$entries",
            },
            {
                $match: {
                    "entries.date": {
                        $gte: todayStart,
                        $lte: todayEnd,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        userName: "$user",
                        eventType: "$event",
                    },
                    total: { $sum: "$entries.count" },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id.userName',
                    foreignField: '_id',
                    as: 'userData',
                },
            },
            {
                $lookup: {
                    from: 'eventtypes',
                    localField: '_id.eventType',
                    foreignField: '_id',
                    as: 'eventData',
                },
            },
            {
                $unwind: "$userData",
            },
            {
                $unwind: "$eventData",
            },
            {
                $project: {
                    _id: 0,
                    userName: "$userData.username",
                    eventType: "$eventData.type",
                    total: 1,
                },
            },
        ]);
        
        const aggregatedData = {};

    // Iterate through the eventData
    todaysEvents.forEach((entry) => {
      const userName = entry.userName;
      const eventName = entry.eventType;
      const eventTotal = entry.total;

      // If userName already exists in aggregatedData, update the existing entry
      if (aggregatedData[userName]) {
        const userEntry = aggregatedData[userName];

        // Check if the event already exists for the user, update total
        const existingEvent = userEntry.events.find((event) => event.eventType === eventName);
        if (existingEvent) {
          existingEvent.total += eventTotal;
        } else {
          // If the event doesn't exist, create a new entry
          userEntry.events.push({ eventName, total: eventTotal });
        }
      } else {
        // If userName doesn't exist, create a new entry
        aggregatedData[userName] = { userName, events: [{ eventName, total: eventTotal }] };
      }
    });

    // Convert the values of the aggregatedData object to an array
    const resultArray = Object.values(aggregatedData);
  
      return res.status(201).json(resultArray);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getYearlyMonthlyEventForEachUser = async (req, res) => {
    try {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

        const yearlyMonthlyEvents = await Event.aggregate([
            {
                $match: {
                    "entries.date": {
                        $gte: startOfYear,
                        $lte: endOfYear,
                    },
                },
            },
            {
                $unwind: "$entries",
            },
            {
                $match: {
                    "entries.date": {
                        $gte: startOfYear,
                        $lte: endOfYear,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        userName: "$user",
                        eventType: "$event",
                        month: { $month: "$entries.date" },
                    },
                    total: { $sum: "$entries.count" },
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id.userName',
                    foreignField: '_id',
                    as: 'userData',
                },
            },
            {
                $lookup: {
                    from: 'eventtypes',
                    localField: '_id.eventType',
                    foreignField: '_id',
                    as: 'eventData',
                },
            },
            {
                $unwind: "$userData",
            },
            {
                $unwind: "$eventData",
            },
            {
                $project: {
                    _id: 0,
                    userName: "$userData.username",
                    eventType: "$eventData.type",
                    month: "$_id.month",
                    total: 1,
                },
            },
        ]);

        const groupedData = {};

        yearlyMonthlyEvents.forEach(entry => {
    const { userName, month, total, eventType } = entry;

    if (!groupedData[userName]) {
      groupedData[userName] = {
        userName,
        months: [],
      };
    }

    const userEntry = groupedData[userName];

    // Check if the month already exists in the user's data
    const existingMonth = userEntry.months.find(m => m.month === month && m.eventType === eventType);

    if (existingMonth) {
      // Update the existing month's total
      existingMonth.total += total;
    } else {
      // Add a new month entry
      userEntry.months.push({
        month,
        total,
        eventType,
      });
    }
  });

  const resultArray = Object.values(groupedData);
  return res.status(201).json(resultArray);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



const EventController = {
    updateEventForUser,
    getEveryUsersEventTotals,
    getTodaysEventForEachUser,
    getYearlyMonthlyEventForEachUser
}

export default EventController;