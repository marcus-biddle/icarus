import { RootState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

export interface LoadingState {
    loading: boolean,
}

const initialState: LoadingState = {
  loading: false,
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
