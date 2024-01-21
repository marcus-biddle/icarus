import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

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
  
  export interface leaderboardState {
    currentLeaderboard: Leaderboard | null
  }
  
  const initialState: leaderboardState = {
    currentLeaderboard: null
  }

  export const fetchLeaderboard: any = createAsyncThunk('user/createUser', async (newUserAttributes: {googleId: string, selectedItems: string[], username: string}) => {
    // const newUser = await userActions.createUser({
    //   googleId: newUserAttributes.googleId, 
    //   selectedItems: newUserAttributes.selectedItems, 
    //   username: newUserAttributes.username, 
    //   id: nanoid()
    // });
  
    // console.log('createUser - userSlice', newUser);
    // return newUser
  });


export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: initialState,
    reducers: {
      setLeaderboard: (state: leaderboardState, action: PayloadAction<Leaderboard>) => {
        state.currentLeaderboard = action.payload
      },
    },
    extraReducers(builder) {
        
    },
  })
  
  
  
  // Action creators are generated for each case reducer function
  export const { 

   } = leaderboardSlice.actions
  
  export default leaderboardSlice.reducer