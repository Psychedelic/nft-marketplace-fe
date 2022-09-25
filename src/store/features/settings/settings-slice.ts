import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCollections } from './async-thunks';
import { Collection } from '@psychedelic/jelly-js';

import type { RootState } from '../../store';

interface AlertsData {
  principalId: string;
  amount: string;
}

export interface SettingsState {
  collapsed: boolean;
  displayPriceApplyButton: boolean;
  showAlerts: boolean;
  assetsToWithdraw: AlertsData[];
  showPageNotFound: boolean;
  collections: Collection[];
  nameofCollection: string | undefined;
}

const initialState: SettingsState = {
  collapsed: false,
  displayPriceApplyButton: false,
  showAlerts: false,
  assetsToWithdraw: [],
  showPageNotFound: false,
  collections: [],
  nameofCollection: '',
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
    setAlerts: (state, action: PayloadAction<AlertsData[]>) => {
      const assets = action.payload;
      state.assetsToWithdraw = assets;

      if (!assets.length) {
        state.showAlerts = false;
        return;
      }

      state.showAlerts = true;
    },
    setPageNotFoundStatus: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.showPageNotFound = action.payload;
    },
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
    },
    setNameOfCollection: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.nameofCollection = action.payload;
    },
  },
});

export const settingsActions = {
  ...settingsSlice.actions,
  getCollections,
};

export const selectSettingsState = (state: RootState) =>
  state.settings;

export default settingsSlice.reducer;
