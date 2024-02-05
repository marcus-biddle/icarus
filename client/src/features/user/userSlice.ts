import { createSlice, nanoid, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userActions } from '../../api/users';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export interface User {
  eventIds: string[];
  currentEventId?: string;
  eventTotals?: [{
    event: string;
    totalDays: number; // update once a day
    totalReps: number;
    totalXp: number;
    lastUpdatedDate: string;
  }],
  currentEvent?: string; // unused
  email?: string;
  name?: string;
  username?: string;
  id?: string | null;
  googleId?: string | null;
  hasGoogleId?: boolean;
  creationDate?: number | null;
  weeklyXp?: number;
  monthlyXp?: number;
  totalXp?: number;
  streak?: number;
  updateUser: number; // this is to track how often a user adds reps
  streakData?: {
    currentStreak: {
      endDate: string;
      lastExtendedDate: string;
      length: number;
      startDate: string;
    } | null,
    longestStreak: {
      achieveDate: string;
      endDate: string;
      length: number;
      startDate: string;
    } | null,
    previousStreak: {
      endDate: string;
      lastExtendedDate: string;
      length: number;
      startDate: string;
    } | null
  },
  xpGains?: [{
    event: string;
    time: number;
    reps: number;
    xp: number;
  }],
  xpSummaries?: [{ 
    event: string;
    week: [{
      timestamp: number;
      count: number;
    }];
    monthSummary: [{
      monthName: string;
      yearIn: string;
      totalCount: number;
      weeks: [{
        weekId: number;
        count: number;
      }]
    }];
    yearSummary: [{
      dateYear: string;
      count: number;
      months: [{
        month: string;
        count: string;
      }]
    }]
  }],
  leaderboardHistory: [{
    ranking: number;
    leagueId: string;
    monthlyXp: number;
    date: string;
  }],
  currentLeaderboard: {
    ranking: number;
    leagueId: string;
    monthlyXp: number;
  }
}

export interface UserState {
  currentUser: User | null
}

const initialState: UserState = {
  currentUser: null
}

export const createUser: any = createAsyncThunk('user/createUser', async (newUserAttributes: {googleId: string, selectedItems: string[], username: string}) => {
  const newUser = await userActions.createUser({
    googleId: newUserAttributes.googleId, 
    selectedItems: newUserAttributes.selectedItems, 
    username: newUserAttributes.username, 
    id: nanoid()
  });

  console.log('createUser - userSlice', newUser);
  return newUser
});

// Update a user's yearly summary. This will be displayed for the Year History Graph.
// TODO: Could be improved with only returning certain data in future.
// export const updateUserYearCount: any = createAsyncThunk('user/updateUserYearCount', async (yearAttributes: {userCount: number, eventId: string, userId: string }) => {
//   console.log('yearCount')
//   return await userActions.updateUserYearCount(yearAttributes.userCount, yearAttributes.eventId, yearAttributes.userId);
// });

export const updateUser: any = createAsyncThunk('user/updateUser', async (attributes: {userCount: number, eventId: string, userId: string }) => {
  console.log('count', attributes.userCount, attributes.eventId, attributes.userId);
  const streak = await userActions.updateStreak(attributes.userId, attributes.eventId);
  const stat = await userActions.updateStatistic(attributes.userId, attributes.eventId, attributes.userCount);
  const year = await userActions.updateUserYearCount(attributes.userCount, attributes.eventId, attributes.userId);
  const month = await userActions.updateUserMonthCount(attributes.userCount, attributes.eventId, attributes.userId);
  const reward = await userActions.rewardXp(attributes.userId, attributes.eventId, attributes.userCount)

  console.log('updateCount', streak, stat, year, month, reward)
  // return reward;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    updateCurrentEvent: (state: UserState, action: PayloadAction<string>) => {
        if (state.currentUser) state.currentUser.currentEventId = action.payload;
    },
    updateUserPractice: (state: UserState, action: PayloadAction<number>) => {
      if (state.currentUser?.eventTotals && state.currentUser.currentEventId) {
        const index = state.currentUser?.eventTotals.findIndex(eventTotal => eventTotal.event === state.currentUser?.currentEventId);
        if (index === -1) {
          state.currentUser?.eventTotals.push({
            event: state.currentUser.currentEventId,
            totalDays: 1,
            totalReps: action.payload,
            totalXp: action.payload,
            lastUpdatedDate: new Date().toLocaleDateString('en-US')
          })
        } else {
          state.currentUser.eventTotals[index] = {
            ...state.currentUser.eventTotals[index],
            totalDays: state.currentUser.eventTotals[index].lastUpdatedDate !== new Date().toLocaleDateString('en-US') ? state.currentUser.eventTotals[index].totalDays + 1 : state.currentUser.eventTotals[index].totalDays,
            totalReps: state.currentUser.eventTotals[index].totalReps + action.payload,
            totalXp: state.currentUser.eventTotals[index].totalXp + action.payload,
            lastUpdatedDate: new Date().toLocaleDateString('en-US')
          }
        }
      } else {
        if (state.currentUser && state.currentUser.currentEventId) {
          state.currentUser.eventTotals = [{
            event: state.currentUser.currentEventId,
            totalDays: 1,
            totalReps: action.payload,
            totalXp: action.payload,
            lastUpdatedDate: new Date().toLocaleDateString('en-US')
          }]
        }
      }

      if (state.currentUser) state.currentUser.monthlyXp = (state.currentUser?.monthlyXp || 0) + action.payload;

      state.currentUser?.xpGains?.push({
        event: state.currentUser.currentEventId || '',
        time: Date.now(),
        reps: action.payload,
        xp: action.payload
      })

      if (state.currentUser) state.currentUser.currentLeaderboard = {
        ranking: 0,
        leagueId: state.currentUser.currentLeaderboard.leagueId,
        monthlyXp: (state.currentUser.monthlyXp || 0)
      }
  },
  },
  extraReducers(builder) {
      builder.addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
      })
      builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        // state.currentUser = action.payload;
      })
      // builder.addCase(updateUserMonthCount.fulfilled, (state, action: PayloadAction<User>) => {
      //   state.currentUser = action.payload;
      // })
  },
})

// After clicking update, user database should update



// Action creators are generated for each case reducer function
export const { 
  setUser,
  updateCurrentEvent,
  updateUserPractice
 } = userSlice.actions

export default userSlice.reducer