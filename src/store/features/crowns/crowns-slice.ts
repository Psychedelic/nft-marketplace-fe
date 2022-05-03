import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import crownsIdlService from '../../../declarations/nft';
import { RootState } from '../../store';
import { actorInstanceHandler } from '../../../integrations/actor';

type CrownsActor = ActorSubclass<crownsIdlService>;

type InitialStateCrowns = {
  actor?: CrownsActor;
  ownerTokenIdentifiers: OwnerTokenIdentifier[];
};

type OwnerTokenIdentifier = bigint;

export type OwnerTokenIdentifiers = OwnerTokenIdentifier[];

type OwnerTokenIdentifiersParam = {
  plugPrincipal: string;
};

interface OwnerTokenIdentifiersParams
  extends CommonCallbacks,
    OwnerTokenIdentifiersParam {}

interface CommonCallbacks {
  onSuccess?: () => void;
  onFailure?: () => void;
}

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
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      getOwnerTokenIdentifiers.fulfilled,
      (state, action) => {
        if (!action.payload) return;

        state.ownerTokenIdentifiers = [...action.payload];
      },
    );
  },
});

export const getOwnerTokenIdentifiers = createAsyncThunk<
  // Return type of the payload creator
  OwnerTokenIdentifiers | undefined,
  // First argument to the payload creator
  OwnerTokenIdentifiersParams,
  // Optional fields for defining the thunk api
  { state: RootState }
>(
  'crowns/ownerTokenIdentifiers',
  async (params: OwnerTokenIdentifiersParams, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'crowns',
      slice: crownsSlice,
    });

    const { plugPrincipal, onFailure } = params;

    try {
      const result = await actorInstance.ownerTokenIdentifiers(
        Principal.fromText(plugPrincipal),
      );

      if (!('Ok' in result)) {
        if (typeof onFailure !== 'function') return;

        onFailure();

        console.error(result);

        throw Error('Oops! Failed to retrieve user tokens');
      }

      return result.Ok;
    } catch (err) {
      console.warn(err);
    }
  },
);

export default crownsSlice.reducer;
