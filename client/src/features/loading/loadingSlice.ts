import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
    loading: boolean,
    lastLoadTimestamp: Date | null
}

const initialState: LoadingState = {
  loading: false,
  lastLoadTimestamp: null
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state: LoadingState, action: PayloadAction<Date>) => {
      state.loading = true;
      state.lastLoadTimestamp = action.payload;
    },
    stopLoading: (state: LoadingState) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
