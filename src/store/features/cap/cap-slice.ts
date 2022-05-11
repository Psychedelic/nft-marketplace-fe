import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import { getTokenContractRootBucket } from './async-thunks';
import capIdlService from '../../../declarations/cap';

type CapActor = ActorSubclass<capIdlService>;

type CapState = {
  actor?: CapActor;
  bucketId: string;
}

// Define the initial state using that type
const initialState: CapState = {
  bucketId: '',
};

export const capSlice = createSlice({
  name: 'cap',
  initialState,
  reducers: {
    setActor: (state, action: PayloadAction<CapActor>) => {
      state.actor = action.payload;
    },
    setBucketId: (state, action: PayloadAction<string>) => {
      state.bucketId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTokenContractRootBucket.fulfilled,
      (state, action) => {
        if (!action.payload) return;

        state.bucketId = action.payload;
      }
    );
  }
});

export const capActions = {
  ...capSlice.actions,
  getTokenContractRootBucket,
};

export default capSlice.reducer;