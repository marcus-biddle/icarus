import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { leaderboardActions } from '../../api/leaderboard'

export interface Leaderboard {
    leagueIds: string[], //list of leagues
    leagueGroups: [{
        leagueId: string,
        users: [{
            ranking: number,
            name: string,
            xp: number,
            userId: string
        }]
    }]
  }
  
  export interface LeaderboardState {
    currentLeaderboard: Leaderboard | null
  }
  
  const initialState: LeaderboardState = {
    currentLeaderboard: null
  }

  export const fetchLeaderboard: any = createAsyncThunk('leaderboard/fetchLeaderboard', async (newUserAttributes: {googleId: string, selectedItems: string[], username: string}) => {
    const leaderboard = await leaderboardActions.getLeaderboard();
    console.log('leaderboard - leaderboardSlice', leaderboard);
    return leaderboard
  });

  export const updateLeaderboardXp: any = createAsyncThunk('leaderboard/updateLeaderboardXp', async (user: {xpGain: number, userId: string}) => {
    const leaderboard = await leaderboardActions.updateLeaderboardXp({xpGain: user.xpGain, userId: user.userId});
    console.log('leaderboardXp - leaderboardSlice', leaderboard);
    return leaderboard
  });

  export const updateLeaderboardRank: any = createAsyncThunk('leaderboard/updateLeaderboardRank', async (user: {xpGain: number, userId: string}) => {
    const leaderboard = await leaderboardActions.updateLeaderboardRank();
    console.log('leaderboardRank - leaderboardSlice', leaderboard);
    return leaderboard
  });


export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: initialState,
    reducers: {
      setLeaderboard: (state: LeaderboardState, action: PayloadAction<Leaderboard>) => {
        state.currentLeaderboard = action.payload
      },
    },
    extraReducers(builder) {
      builder.addCase(fetchLeaderboard.fulfilled, (state, action: PayloadAction<Leaderboard>) => {
        state.currentLeaderboard = action.payload;
      }),
      builder.addCase(updateLeaderboardXp.fulfilled, (state, action: PayloadAction<Leaderboard>) => {
        state.currentLeaderboard = action.payload;
      }),
      builder.addCase(updateLeaderboardRank.fulfilled, (state, action: PayloadAction<any>) => {
        state.currentLeaderboard = action.payload.updatedLeaderboard;
      })
    },
  })
  
  
  
  // Action creators are generated for each case reducer function
  export const { 
    setLeaderboard
   } = leaderboardSlice.actions
  
  export default leaderboardSlice.reducer