import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import { getUserTransactions } from './async-thunks/get-user-transactions';
import capRootIdlService, {
  GetTransactionsResponseBorrowed,
} from '../../../declarations/cap-root';

type CapRootActor = ActorSubclass<capRootIdlService>;

type CapRootState = {
  actor?: CapRootActor;
  bucketId: string;
  loading: boolean;
  response?: GetTransactionsResponseBorrowed;
};

// Define the initial state using that type
const initialState: CapRootState = {
  bucketId: '',
  loading: false,
};

export const capRootSlice = createSlice({
  name: 'capRoot',
  initialState,
  reducers: {
    setActor: (state, action: PayloadAction<CapRootActor>) => {
      state.actor = action.payload;
    },
    setBucketId: (state, action: PayloadAction<string>) => {
      state.bucketId = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserTransactions.fulfilled,
      (state, action) => {
        if (!action.payload) return;

        state.response = action.payload;
      },
    );
  },
});

export const capRootActions = {
  ...capRootSlice.actions,
  getUserTransactions,
};

export default capRootSlice.reducer;

