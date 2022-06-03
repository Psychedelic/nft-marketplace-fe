import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

interface AlertsData {
  principalId: string;
  amount: string;
}

export interface SettingsState {
  collapsed: boolean;
  displayPriceApplyButton: boolean;
  previouslyVisitedPath: string;
  allVisitedPaths: Array<string>;
  showAlerts: boolean;
  assetsToWithdraw: AlertsData[];
}

const initialState: SettingsState = {
  collapsed: true,
  displayPriceApplyButton: false,
  previouslyVisitedPath: '/',
  allVisitedPaths: [],
  showAlerts: false,
  assetsToWithdraw: [],
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
    setIsVisitedPath: (state, action: PayloadAction<string>) => {
      if (!state.allVisitedPaths.includes(action.payload))
        state.allVisitedPaths = [
          ...state.allVisitedPaths,
          action.payload,
        ];
    },
    removeLastVisitedPath: (state) => {
      state.allVisitedPaths = state.allVisitedPaths.slice(0, -1);
    },
    setAlerts: (state, action: PayloadAction<AlertsData[]>) => {
      const assets = action.payload;
      state.assetsToWithdraw = assets;

      if (!assets.length) {
        state.showAlerts = false;
        return;
      }

      state.showAlerts = true;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export const selectSettingsState = (state: RootState) =>
  state.settings;

export default settingsSlice.reducer;
