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

export const createUser: any = createAsyncThunk('user/createUser', async (newUserAttributes: { username: string, password: string, email: string }) => {
  const newUser = await userActions.createUser({
    password: newUserAttributes.password, 
    username: newUserAttributes.username,
    email: newUserAttributes.email,
    id: nanoid()
  });

  return newUser
});

export const fetchUserForLogin: any = createAsyncThunk('user/fetchUserForLogin', async (existingUserAttributes: { email: string, password: string }) => {
  const newUser = await userActions.fetchUserForLogin({
    password: existingUserAttributes.password, 
    email: existingUserAttributes.email,
  });
  
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
//not updating currentEventId, need to add to backup
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
      console.log('user removed')
    },
    updateCurrentEvent: (state: UserState, action: PayloadAction<string>) => {
        if (state.currentUser) state.currentUser.currentEventId = action.payload;
    },
    updateGraphs: (state: UserState) => {
      if (!state.currentUser) {
        return state; // If currentUser doesn't exist, return the current state unchanged
      }
      const binSizes = [10, 25, 50, 75, 76];

      if (!state.currentUser.graphs) {
        // If graphs doesn't exist, initialize it with an empty array
        state.currentUser.graphs = [{
          graphType: 'histogram',
          graphData: {
            userData: [],
            averageUsers: null,
            binSizes: binSizes
          }
        }];
      }
      // update histogram here
      
      const counts = Array(binSizes.length).fill(0);

      state.currentUser?.xpGains.filter(entry => entry.event === state.currentUser?.currentEventId).forEach((item) => {
        // Find the appropriate bin for the current item
        let foundBin = false;
        for (let index = 0; index < binSizes.length; index++) {
          const binSize = binSizes[index];
          if (item.reps < binSize) {
            counts[index]++;
            foundBin = true;
            break; // Exit the loop once the bin is found
          }
        }
    
        // If the rep count exceeds the last bin size, assign it to the last bin
        if (!foundBin) {
          counts[counts.length - 1]++;
        }
      });

      const newGraph = {
        graphType: 'histogram',
        graphData: {
          userData: counts,
          averageUsers: null,
          binSizes: binSizes
        }
      };
    
      const histIndex = state.currentUser.graphs.findIndex(graph => graph.graphType === 'histogram');

      if (histIndex === -1) {
        // Push new graph into the existing graphs array
        state.currentUser.graphs.push(newGraph);
      } else {
        state.currentUser.graphs[histIndex] = newGraph;
      }
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

      // if (state.currentUser) state.currentUser.monthlyXp = (state.currentUser?.monthlyXp || 0) + action.payload;

      state.currentUser?.xpGains?.push({
        event: state.currentUser.currentEventId || '',
        time: Date.now(),
        reps: action.payload,
        xp: action.payload
      })
  },
  },
  extraReducers(builder) {
      builder.addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
      }),
      builder.addCase(fetchUserForLogin.fulfilled, (state, action: PayloadAction<User>) => {
        state.currentUser = action.payload;
      }),
      builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const currentEventId = state.currentUser?.currentEventId || '';
        state.currentUser = action.payload;
        state.currentUser.currentEventId = currentEventId;
        if (!state.currentUser.graphs) {
          const binSizes = [10, 25, 50, 75, 76];
          // If graphs doesn't exist, initialize it with an empty array
          state.currentUser.graphs = [{
            graphType: 'histogram',
            graphData: {
              userData: [],
              averageUsers: null,
              binSizes: binSizes
            }
          }];
        }
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
  updateUserPractice,
  updateGraphs
 } = userSlice.actions

export default userSlice.reducer