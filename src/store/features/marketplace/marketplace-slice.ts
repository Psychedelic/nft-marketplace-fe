/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import marketplaceIdlService from '../../../declarations/marketplace';
import { actorInstanceHandler } from '../../../integrations/actor';
import config from '../../../config/env';
import { errorActions } from '../errors';
import { RootState } from '../../store';
import { parseAllListingResponse, GetAllListingsDataParsed } from '../../../utils/parser';

interface MakeListingParams extends MakeListing {
  onSuccess?: () => void;
  onFailure?: () => void;
}

type MakeListing = {
  id: string;
  amount: string;
};

interface CancelListingParams extends CancelListing {
  onSuccess?: () => void;
  onFailure?: () => void;
}

type CancelListing = {
  id: string;
};

interface MakeOfferParams extends MakeOffer {
  onSuccess?: () => void;
  onFailure?: () => void;
}

type MakeOffer = {
  id: string;
  amount: string;
};

interface AcceptOfferParams extends AcceptOffer {
  onSuccess?: () => void;
  onFailure?: () => void;
}

type AcceptOffer = {
  id: string;
  buyerPrincipalId: string;
};

type RecentyListedForSale = MakeListing[];

type MarketplaceActor = ActorSubclass<marketplaceIdlService>;

type InitialState = {
  recentlyListedForSale: RecentyListedForSale;
  allListings: GetAllListingsDataParsed[];
  actor?: MarketplaceActor;
};

const initialState: InitialState = {
  recentlyListedForSale: [],
  allListings: [],
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
    builder.addCase(makeListing.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.recentlyListedForSale.push(action.payload);
    });

    builder.addCase(getAllListings.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.allListings = action.payload;
    });
  },
});

export const getAllListings = createAsyncThunk<
  // Return type of the payload creator
  GetAllListingsDataParsed[] | undefined,
  // First argument to the payload creator
  undefined,
  // Optional fields for defining the thunk api
  { state: RootState }
>('marketplace/getAllListings', async (params: any, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  try {
    const allListings = await actorInstance.getAllListings();
    const parsed = parseAllListingResponse(allListings);

    console.log('[debug] parsed', parsed);

    return parsed;
  } catch (err) {
    console.warn(err);
  }
});

export const makeListing = createAsyncThunk<
  // Return type of the payload creator
  MakeListing | undefined,
  // First argument to the payload creator
  MakeListingParams,
  // Optional fields for defining the thunk api
  { state: RootState }
>('marketplace/makeListing', async (params: MakeListingParams, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { id, amount, onSuccess, onFailure } = params;

  try {
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
    const userOwnedTokenId = BigInt(id);
    const userListForPrice = BigInt(amount);

    const result = await actorInstance.makeListing(
      false, // direct buy
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
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export const cancelListingBySeller = createAsyncThunk<
  // Return type of the payload creator
  CancelListing | undefined,
  // First argument to the payload creator
  CancelListingParams,
  // Optional fields for defining the thunk api
  { state: RootState }
>('marketplace/cancelListingBySeller', async (params: CancelListingParams, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { id, onSuccess, onFailure } = params;

  try {
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
    const userOwnedTokenId = BigInt(id);

    const result = await actorInstance.cancelListingBySeller(nonFungibleContractAddress, userOwnedTokenId);

    if (!('Ok' in result)) {
      if (typeof onFailure !== 'function') return;

      onFailure();

      console.error(result);

      throw Error('Oops! Failed to cancel listing');
    }

    if (typeof onSuccess !== 'function') return;

    console.info(result);

    onSuccess();

    return {
      id,
    };
  } catch (err) {
    thunkAPI.dispatch(errorActions.setErrorMessage(err.message));
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export const makeOffer = createAsyncThunk<
  // Return type of the payload creator
  MakeOffer | undefined,
  // First argument to the payload creator
  MakeOfferParams,
  // Optional fields for defining the thunk api
  { state: RootState }
>('marketplace/makeOffer', async (params: MakeOfferParams, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { id, amount, onSuccess, onFailure } = params;

  try {
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
    const userOwnedTokenId = BigInt(id);
    const userOfferInPrice = BigInt(amount);

    const result = await actorInstance.makeOffer(nonFungibleContractAddress, userOwnedTokenId, userOfferInPrice);

    if (!('Ok' in result)) {
      if (typeof onFailure !== 'function') return;

      onFailure();

      console.error(result);

      throw Error('Oops! Failed to make offer');
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
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export const acceptOffer = createAsyncThunk<
  // Return type of the payload creator
  AcceptOffer | undefined,
  // First argument to the payload creator
  AcceptOfferParams,
  // Optional fields for defining the thunk api
  { state: RootState }
>('marketplace/acceptOffer', async (params: AcceptOfferParams, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { id, buyerPrincipalId, onSuccess, onFailure } = params;

  try {
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
    const userOwnedTokenId = BigInt(id);

    const result = await actorInstance.acceptOffer(nonFungibleContractAddress, userOwnedTokenId, buyerPrincipalId);

    if (!('Ok' in result)) {
      if (typeof onFailure !== 'function') return;

      onFailure();

      console.error(result);

      throw Error('Oops! Failed to accept offer');
    }

    if (typeof onSuccess !== 'function') return;

    console.info(result);

    onSuccess();

    return {
      id,
      buyerPrincipalId,
    };
  } catch (err) {
    thunkAPI.dispatch(errorActions.setErrorMessage(err.message));
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export default marketplaceSlice.reducer;
