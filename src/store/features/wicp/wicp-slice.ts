import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import wicpIdlService from '../../../declarations/wicp';

type WICPActor = ActorSubclass<wicpIdlService>;

type InitialStateCrowns = {
  actor?: WICPActor;
};

const initialState: InitialStateCrowns = {};

export const wicpSlice = createSlice({
  name: 'wicp',
  initialState,
  reducers: {
    setActor: (state, action: PayloadAction<WICPActor>) => {
      state.actor = action.payload;
    },
  },
});

export default wicpSlice.reducer;
