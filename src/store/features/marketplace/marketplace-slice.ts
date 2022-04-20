/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import marketplaceIdlService from '../../../declarations/marketplace';
import crownsIdlService from '../../../declarations/nft';
import { actorInstanceHandler } from '../../../integrations/actor';
import config from '../../../config/env';
import { errorActions } from '../errors';
import { RootState } from '../../store';
import { crownsSlice } from '../crowns/crowns-slice';
import { wicpSlice } from '../wicp/wicp-slice';
import { GetAllListingsDataParsedObj, parseAllListingResponseAsObj } from '../../../utils/parser';

interface MakeListingParams extends MakeListing {
  onSuccess?: () => void;
  onFailure?: () => void;
}

type MakeListing = {
  id: string;
  amount: string;
};

interface DirectBuyParams extends DirectBuy {
  onSuccess?: () => void;
  onFailure?: () => void;
}

type DirectBuy = {
  tokenId: BigInt;
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
  allListings: GetAllListingsDataParsedObj;
  actor?: MarketplaceActor;
};

const initialState: InitialState = {
  recentlyListedForSale: [],
  allListings: [],
};

type CommonError = { message: string };

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
  GetAllListingsDataParsedObj | undefined,
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
    const parsed = parseAllListingResponseAsObj(allListings);

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
  const actorInstanceMkp = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const actorInstanceCrowns = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'crowns',
    slice: crownsSlice,
  });

  const { id, amount, onSuccess, onFailure } = params;

  try {
    const marketplaceCanisterId = Principal.fromText(config.marketplaceCanisterId);
    const crownsCanisterId = Principal.fromText(config.crownsCanisterId);
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
    const userOwnedTokenId = BigInt(id);
    const userListForPrice = BigInt(amount);

    const resultCrowns = await actorInstanceCrowns.approve(marketplaceCanisterId, userOwnedTokenId);

    if (!('Ok' in resultCrowns)) {
      if (typeof onFailure !== 'function') return;

      onFailure();

      console.error(resultCrowns);

      throw Error('Oops! Failed to approve Marketplace Canister to control Crowns token');
    }

    const resultDepositNFT = await actorInstanceMkp.depositNFT(crownsCanisterId, userOwnedTokenId);

    if (!('Ok' in resultDepositNFT)) {
      if (typeof onFailure !== 'function') return;

      onFailure();

      console.error(resultDepositNFT);

      throw Error('Oops! Failed to deposit the Crowns NFT');
    }

    const directBuy = true;
    const resultMakeListing = await actorInstanceMkp.makeListing(
      directBuy,
      nonFungibleContractAddress,
      userOwnedTokenId,
      userListForPrice,
    );

    if (!('Ok' in resultMakeListing)) {
      if (typeof onFailure !== 'function') return;

      onFailure();

      console.error(resultMakeListing);

      throw Error('Oops! Failed to list for sale');
    }

    if (typeof onSuccess !== 'function') return;

    console.info(resultMakeListing);

    onSuccess();

    return {
      id,
      amount,
    };
  } catch (err) {
    thunkAPI.dispatch(errorActions.setErrorMessage((err as CommonError).message));
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export const directBuy = createAsyncThunk<
  // Return type of the payload creator
  DirectBuy | undefined,
  // First argument to the payload creator
  DirectBuyParams,
  // Optional fields for defining the thunk api
  { state: RootState }
>('marketplace/directBuy', async (params: DirectBuyParams, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstanceMkp = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const actorInstanceWICP = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'wicp',
    slice: wicpSlice,
  });

  const { tokenId, onSuccess, onFailure } = params;

  // TODO: Get this from the user, UI
  const wicpAmount = 1_000;

  try {
    const marketplaceCanisterId = Principal.fromText(config.marketplaceCanisterId);
    const wicpCanisterId = Principal.fromText(config.wICPCanisterId);
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);

    const resultApproveWicp = await actorInstanceWICP.approve(marketplaceCanisterId, wicpAmount);

    if (!('Ok' in resultApproveWicp)) {
      if (typeof onFailure !== 'function') return;

      onFailure();

      console.error(resultApproveWicp);

      throw Error('Oops! Failed to approve Marketplace to access WICP');
    }

    const resultDepositFungibleMkp = await actorInstanceMkp.depositFungible(
      wicpCanisterId,
      { DIP20: null },
      wicpAmount,
    );

    if (!('Ok' in resultApproveWicp)) {
      if (typeof onFailure !== 'function') return;

      onFailure();

      console.error(resultDepositFungibleMkp);

      throw Error('Oops! Failed to deposit WICP');
    }

    const resultDirectBuyMkp = await actorInstanceMkp.directBuy(nonFungibleContractAddress, tokenId);

    if (!('Ok' in resultDirectBuyMkp)) {
      if (typeof onFailure !== 'function') return;

      onFailure();

      console.error(resultDirectBuyMkp);

      throw Error('Oops! Failed to direct buy');
    }

    if (typeof onSuccess !== 'function') return;

    onSuccess();

    return {
      tokenId,
    };
  } catch (err) {
    thunkAPI.dispatch(errorActions.setErrorMessage((err as CommonError).message));
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
    thunkAPI.dispatch(errorActions.setErrorMessage((err as CommonError).message));
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
    thunkAPI.dispatch(errorActions.setErrorMessage((err as CommonError).message));
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
    thunkAPI.dispatch(errorActions.setErrorMessage((err as CommonError).message));
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export default marketplaceSlice.reducer;

