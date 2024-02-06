import { createSlice, nanoid, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userActions } from '../../api/users';
import { User } from './userTypes';
import { RootState } from '@/app/store';


export interface UserState {
  currentUser: User | null,
  status: string,
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
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
  await userActions.updateStreak(attributes.userId, attributes.eventId);
  await userActions.updateUserYearCount(attributes.userCount, attributes.eventId, attributes.userId);
  await userActions.updateUserMonthCount(attributes.userCount, attributes.eventId, attributes.userId);
  await userActions.updateStatistic(attributes.userId, attributes.eventId, attributes.userCount);
  const reward = await userActions.rewardXp(attributes.userId, attributes.eventId, attributes.userCount);

  console.log('updateCount', reward)
  return reward;
});

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
    removeUser: (state: UserState) => {
      state.currentUser = null;
      console.log('test')
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
        state.currentUser = action.payload;
      })
  },
})

export const getCurrentUser = (state: RootState) => state.user.currentUser;
export const getUserStatus = (state: RootState) => state.user.status;
export const getUserError = (state: RootState) => state.user.error;

export const { 
  setUser,
  removeUser,
  updateCurrentEvent,
  updateUserPractice
 } = userSlice.actions

export default userSlice.reducer