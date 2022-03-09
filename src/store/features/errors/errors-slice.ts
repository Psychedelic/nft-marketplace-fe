import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export type errorMessages = {
  message: string;
  id: number;
};

export interface ErrorState {
  errorMessages: errorMessages[];
}

const initialState: ErrorState = {
  errorMessages: [
    {
      message: 'Failed to connect to Plug, please try again.',
      id: 10,
    },
    {
      message: 'Failed to fetch collection details, please try refreshing the page.',
      id: 100,
    },
  ],
};

export const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessages.push({
        message: action.payload,
        id: Date.now(),
      });
    },
    removeErrorMessage: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.errorMessages = state.errorMessages.filter(
        (error) => error.id !== action.payload,
      );
    },
  },
});

export const errorActions = errorSlice.actions;

export const selectErrorState = (state: RootState) => state.errors;

export default errorSlice.reducer;
