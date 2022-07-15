import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { PlugStatusCodes } from '../../../constants';

// Define a type for the slice state
interface PlugState {
  isConnected: boolean;
  principalId?: string;
  connectionStatus: PlugStatusCodes;
  walletsWICPBalance: number;
  loadingWICPBalance: boolean;
  icnsName?: string;
}

// Define the initial state using that type
const initialState: PlugState = {
  isConnected: false,
  principalId: undefined,
  connectionStatus: 'verifying' as PlugStatusCodes,
  walletsWICPBalance: 0,
  loadingWICPBalance: true,
  icnsName: undefined,
};

export const plugSlice = createSlice({
  name: 'plug',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      if (!action.payload) {
        state.principalId = undefined;
        state.connectionStatus = PlugStatusCodes.FailedToConnect;
      } else {
        state.connectionStatus = PlugStatusCodes.Connected;
      }
    },
    setPrincipalId: (state, action: PayloadAction<string>) => {
      state.principalId = action.payload;
    },
    setICNSName: (state, action: PayloadAction<string>) => {
      state.icnsName = action.payload;
    },
    setConnectionStatus: (
      state,
      action: PayloadAction<PlugStatusCodes>,
    ) => {
      state.connectionStatus = action.payload;
    },
    setWalletsWICPBalance: (state, action: PayloadAction<number>) => {
      state.walletsWICPBalance = action.payload;
    },
    setLoadingWICPBalance: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.loadingWICPBalance = action.payload;
    },
  },
});

export const plugActions = plugSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPlugState = (state: RootState) => state.plug;

export default plugSlice.reducer;
