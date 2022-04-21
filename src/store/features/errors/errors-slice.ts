import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export type errorMessages = {
  message: string;
  id: number;
};

export type sucessMessages = {
  message: string;
  id: number;
};

export interface NotificationState {
  errorMessages: errorMessages[];
  sucessMessages: sucessMessages[];
}

const initialState: NotificationState = {
  errorMessages: [],
  sucessMessages: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
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
      state.errorMessages = state.errorMessages.filter((error) => error.id !== action.payload);
    },
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.sucessMessages.push({
        message: action.payload,
        id: Date.now(),
      });
    },
    removeSuccessMessage: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
      state.sucessMessages = state.sucessMessages.filter((successMessage) => successMessage.id !== action.payload);
    },
  },
});

export const notificationActions = notificationSlice.actions;

export const selectNotificationState = (state: RootState) => state.notification;

export default notificationSlice.reducer;
