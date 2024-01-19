import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  events: string[];
  currentEventId?: string;
  currentEvent?: string;
  email?: string;
  name?: string;
  username?: string;
  id?: number | null;
  googleId?: string | null;
  hasGoogleId?: boolean;
  creationDate?: number | null;
  weeklyXp?: number;
  monthlyXp?: number;
  totalXp?: number;
  streak?: number;
  updateCounts: number;
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
    totalReps: number;
    xp: number;
  }],
  xpSummaries?: [{
    date: number;
    gainedXp: number;
    numUpdateCounts: number;
    streakExtended: boolean;
    totalUpdatedCounts: number;
    userId: number;
  }]
}

const initialState: UserState = {
  events: [],
  hasGoogleId: false,
  updateCounts: 0,
  streakData: {
    currentStreak: null,
    longestStreak: null,
    previousStreak: null
  },
  xpGains: [{
    event: '',
    time: 0,
    totalReps: 0,
    xp: 0,
  }],
  xpSummaries: [{
    date: 0,
    gainedXp: 0,
    numUpdateCounts: 0,
    streakExtended: true,
    totalUpdatedCounts: 0,
    userId: 0,
  }]
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addEvent: (state: UserState, action: PayloadAction<string>) => {
      state.events.push(action.payload)
    },
    removeEvent: (state: UserState, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event !== action.payload);
    },
    updateCurrentEvent: (state: UserState, action: PayloadAction<string>) => {
      const isAllowed = state.events.includes(action.payload);
      if (isAllowed) {
        state.currentEventId = action.payload;
      } else {
        state.currentEventId = state.events[0] || "";
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  addEvent,

 } = userSlice.actions

export default userSlice.reducer