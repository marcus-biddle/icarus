import { createSlice, nanoid, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { userActions } from '../../api/users';

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
  updateCounts: number; // this is to track how often a user adds reps
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
    date: number;
    gainedXp: number;
    numUpdateCounts: number;
    streakExtended: boolean;
    totalUpdatedCounts: number;
    userId: number;
  }],
  leaderboard: {
    ranking: number;
    leagueId: string;
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

// export const userLogin: any = createAsyncThunk('user/createUser', async (googleId: string) => {
//   const newUser = await userActions.getUser(googleId);

//   console.log('createUser - userSlice', newUser);
//   return newUser
// });

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

  },
  },
  extraReducers(builder) {
      builder.addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
      })
  },
})



// Action creators are generated for each case reducer function
export const { 
  setUser,
  updateCurrentEvent,
  updateUserPractice
 } = userSlice.actions

export default userSlice.reducer