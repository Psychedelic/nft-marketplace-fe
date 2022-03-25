/* eslint-disable */
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import marketplaceIdlService from '../../../declarations/marketplace';
import { actorInstanceHandler } from '../../../integrations/actor';
import config from '../../../config/env';
import { errorActions } from '../errors';
import { RootState } from '../../store';

interface ListForSaleParams extends ListForSale {
  onSuccess?: () => void;
  onFailure?: () => void;
}

type ListForSale = {
  id: string;
  amount: string;
};

type RecentyListedForSale = ListForSale[];

type MarketplaceActor = ActorSubclass<marketplaceIdlService>;

type InitialState = {
  recentlyListedForSale: RecentyListedForSale;
  actor?: MarketplaceActor;
};

const initialState: InitialState = {
  recentlyListedForSale: [],
};

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setActor: (state, action: PayloadAction<MarketplaceActor>) => {
      state.actor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listForSale.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.recentlyListedForSale.push(action.payload);
    });
  },
});

export const listForSale = createAsyncThunk<
  // Return type of the payload creator
  ListForSale | undefined,
  // First argument to the payload creator
  ListForSaleParams,
  // Optional fields for defining the thunk api
  { state: RootState }
>(
  'marketplace/listForSale',
  async (params: ListForSaleParams, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'marketplace',
      slice: marketplaceSlice,
    });

    try {
      const { id, amount, onSuccess, onFailure } = params;
      const nonFungibleContractAddress = Principal.fromText(
        config.crownsCanisterId,
      );
      const userOwnedTokenId = BigInt(id);
      const userListForPrice = BigInt(amount);

      const result = await actorInstance.listForSale(
        nonFungibleContractAddress,
        userOwnedTokenId,
        userListForPrice,
      );

      if (!('Ok' in result)) {
        if (typeof onFailure !== 'function') return;

        onFailure();

        console.error(result);

        throw Error('Oops! Failed to list for sale');
      }

      if (typeof onSuccess !== 'function') return;

      console.info(result);

      onSuccess();

      return {
        id,
        amount,
      };
    } catch (err) {
      thunkAPI.dispatch(errorActions.setErrorMessage(err.message));
    }
  },
);

export default marketplaceSlice.reducer;
