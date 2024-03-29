import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
    loading: boolean,
    lastLoadTimestamp: string | null
}

const initialState: LoadingState = {
  loading: false,
  lastLoadTimestamp: null
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state: LoadingState) => {
      state.loading = true;
    },
    stopLoading: (state: LoadingState) => {
      state.loading = false;
    },
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
