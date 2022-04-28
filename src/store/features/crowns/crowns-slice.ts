/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import crownsIdlService from '../../../declarations/nft';

type CrownsActor = ActorSubclass<crownsIdlService>;

type InitialStateCrowns = {
  actor?: CrownsActor;
};

const initialState: InitialStateCrowns = {};

export const crownsSlice = createSlice({
  name: 'crowns',
  initialState,
  reducers: {
    setActor: (state, action: PayloadAction<CrownsActor>) => {
      state.actor = action.payload;
    },
  },
});

export default crownsSlice.reducer;
