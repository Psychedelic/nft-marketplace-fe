import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface SettingsState {
  collapsed: boolean;
  displayPriceApplyButton: boolean;
  previouslyVisitedPath: string;
}

const initialState: SettingsState = {
  collapsed: true,
  displayPriceApplyButton: false,
  previouslyVisitedPath: '/',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFilterCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
    setPriceApplyButton: (state, action: PayloadAction<boolean>) => {
      state.displayPriceApplyButton = action.payload;
    },
    setPreviouslyVisitedPath: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.previouslyVisitedPath = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export const selectSettingsState = (state: RootState) =>
  state.settings;

export default settingsSlice.reducer;
