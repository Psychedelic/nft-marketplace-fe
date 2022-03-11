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
  errorMessages: [],
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
