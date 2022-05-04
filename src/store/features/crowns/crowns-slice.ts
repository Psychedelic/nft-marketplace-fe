import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import crownsIdlService from '../../../declarations/nft';
import { getOwnerTokenIdentifiers } from './async-thunks';

type CrownsActor = ActorSubclass<crownsIdlService>;

type InitialStateCrowns = {
  actor?: CrownsActor;
  ownerTokenIdentifiers: OwnerTokenIdentifier[];
};

type OwnerTokenIdentifier = bigint;

export type OwnerTokenIdentifiers = OwnerTokenIdentifier[];

const initialState: InitialStateCrowns = {
  ownerTokenIdentifiers: [],
};

export const crownsSlice = createSlice({
  name: 'crowns',
  initialState,
  reducers: {
    setActor: (state, action: PayloadAction<CrownsActor>) => {
      state.actor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getOwnerTokenIdentifiers.fulfilled,
      (state, action) => {
        if (!action.payload) return;

        state.ownerTokenIdentifiers = [...action.payload];
      },
    );
  },
});

export const crownsActions = {
  ...crownsSlice.actions,
  getOwnerTokenIdentifiers,
};

export default crownsSlice.reducer;
