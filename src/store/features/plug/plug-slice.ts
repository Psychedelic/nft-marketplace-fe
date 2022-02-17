import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { PLUG_STATUS_CODES } from '../../../constants';

// Define a type for the slice state
interface PlugState {
  isConnected: boolean;
  principalId?: string;
  connectionStatus: PLUG_STATUS_CODES;
}

// Define the initial state using that type
const initialState: PlugState = {
  isConnected: false,
  principalId: undefined,
  connectionStatus: 'verifying' as PLUG_STATUS_CODES,
};

export const plugSlice = createSlice({
  name: 'plug',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
      state.connectionStatus = PLUG_STATUS_CODES.Connected;
      if (!action.payload) {
        state.principalId = undefined;
      }
    },
    setPrincipalId: (state, action: PayloadAction<string>) => {
      state.principalId = action.payload;
    },
    setConnectionStatus: (
      state,
      action: PayloadAction<PLUG_STATUS_CODES>,
    ) => {
      state.connectionStatus = action.payload;
    },
  },
});

export const plugActions = plugSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPlugState = (state: RootState) => state.plug;

export default plugSlice.reducer;
