/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import marketplaceIdlService from '../../../declarations/marketplace';
// import crownsIdlService from '../../../declarations/nft';
import { actorInstanceHandler } from '../../../integrations/actor';
import crownsIdlFactory from '../../../declarations/nft.did';
import marketplaceIdlFactory from '../../../declarations/marketplace.did';
import wicpIdlFactory from '../../../declarations/wicp.did';
import config from '../../../config/env';
import { notificationActions } from '../errors';
import { RootState } from '../../store';
import { crownsSlice } from '../crowns/crowns-slice';
import { wicpSlice } from '../wicp/wicp-slice';
import { GetAllListingsDataParsedObj, parseAllListingResponseAsObj, parseGetTokenOffersresponse } from '../../../utils/parser';

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

interface GetUserReceviedOfferParams extends GetUserReceviedOffer {
  onSuccess?: (offers: any) => void;
  onFailure?: () => void;
}

type GetUserReceviedOffer = {
  userTokenIds?: number[]
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
  const { id, amount, onSuccess, onFailure } = params;
  const marketplaceCanisterId = Principal.fromText(config.marketplaceCanisterId);
  const crownsCanisterId = Principal.fromText(config.crownsCanisterId);
  const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);

  const userOwnedTokenId = BigInt(id);
  const userListForPrice = BigInt(amount);

  try {
    const CROWNS_APPROVE_MARKETPLACE = {
      idl: crownsIdlFactory,
      canisterId: config.crownsCanisterId,
      methodName: 'approve',
      args: [marketplaceCanisterId, userOwnedTokenId],
      onFail: (res: any) => {
        console.warn(`Oops! Failed to approve Marketplace (${config.crownsCanisterId})`, res);

        typeof onFailure === 'function' && onFailure();
      },
    };

    const MKP_DEPOSIT_NFT = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'depositNFT',
      args: [crownsCanisterId, userOwnedTokenId],
      onFail: (res: any) => {
        console.warn(`Oops! Failed to deposit NFT (${crownsCanisterId}, ${userOwnedTokenId})`, res);

        typeof onFailure === 'function' && onFailure();
      },
    };

    const directBuy = true;
    const MKP_MAKE_LISTING = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'makeListing',
      args: [directBuy, nonFungibleContractAddress, userOwnedTokenId, userListForPrice],
      onSuccess,
      onFail: (res: any) => {
        console.warn('Oops! Failed to make listing', res);

        typeof onFailure === 'function' && onFailure();
      },
    };

    const batchTxRes = await (window as any)?.ic?.plug?.batchTransactions([
      CROWNS_APPROVE_MARKETPLACE,
      MKP_DEPOSIT_NFT,
      MKP_MAKE_LISTING,
    ]);

    if (!batchTxRes) {
      typeof onFailure === 'function' && onFailure();

      return;
    }

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
  const { tokenId, onSuccess, onFailure } = params;

  const marketplaceCanisterId = Principal.fromText(config.marketplaceCanisterId);
  const wicpCanisterId = Principal.fromText(config.wICPCanisterId);
  const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);

  // TODO: Get this from the user, UI
  const wicpAmount = 1_000;

  try {
    const WICP_APPROVE = {
      idl: crownsIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [marketplaceCanisterId, wicpAmount],
      onFail: (res: any) => {
        console.warn('Oops! Failed to deposit WICP', res);

        typeof onFailure === 'function' && onFailure();
      },
    };

    const MKP_DEPOSIT_WICP = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'depositFungible',
      args: [wicpCanisterId, { DIP20: null }, wicpAmount],
      onFail: (res: any) => {
        console.warn('Oops! Failed to deposit WICP', res);

        typeof onFailure === 'function' && onFailure();
      },
    };

    const MKP_DIRECT_BUY = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'directBuy',
      args: [nonFungibleContractAddress, tokenId],
      onFail: (res: any) => {
        console.warn('Oops! Failed to direct buy', res);

        typeof onFailure === 'function' && onFailure();
      },
      onSuccess,
    };

    const batchTxRes = await (window as any)?.ic?.plug?.batchTransactions([
      WICP_APPROVE,
      MKP_DEPOSIT_WICP,
      MKP_DIRECT_BUY,
    ]);

    if (!batchTxRes) {
      typeof onFailure === 'function' && onFailure();

      return;
    }

    return {
      tokenId,
    };
  } catch (err) {
    thunkAPI.dispatch(notificationActions.setErrorMessage((err as CommonError).message));
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export const cancelListing = createAsyncThunk<
  // Return type of the payload creator
  CancelListing | undefined,
  // First argument to the payload creator
  CancelListingParams,
  // Optional fields for defining the thunk api
  { state: RootState }
>('marketplace/cancelListing', async (params: CancelListingParams, thunkAPI) => {
  const { id, onSuccess, onFailure } = params;
  
  const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
  const userOwnedTokenId = BigInt(id);

  try {
    const MKP_WITHDRAW_NFT = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'withdrawNFT',
      args: [nonFungibleContractAddress, userOwnedTokenId],
      onFail: (res: any) => {
        console.warn('Oops! Failed to withdraw NFT', res);

        typeof onFailure === 'function' && onFailure();
      },
      onSuccess,
    };

    const batchTxRes = await (window as any)?.ic?.plug?.batchTransactions([
      MKP_WITHDRAW_NFT,
    ]);

    if (!batchTxRes) {
      typeof onFailure === 'function' && onFailure();

      return;
    }

    return {
      id,
    };
  } catch (err) {
    thunkAPI.dispatch(notificationActions.setErrorMessage((err as CommonError).message));
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
  const { id, amount, onSuccess, onFailure } = params;

  const mkpContractAddress = Principal.fromText(config.marketplaceCanisterId);
  const wicpContractAddress = Principal.fromText(config.wICPCanisterId);
  const crownsContractAddress = Principal.fromText(config.crownsCanisterId);
  const userOwnedTokenId = BigInt(id);
  const userOfferInPrice = BigInt(amount);

  try {
    const WICP_APPROVE_MARKETPLACE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [mkpContractAddress, userOfferInPrice],
      onFail: (res: any) => {
        console.warn(`Oops! Failed to approve Marketplace (${config.wICPCanisterId})`, res);

        typeof onFailure === 'function' && onFailure();
      },
    };

    const MKP_MAKE_OFFER_WICP = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'makeOffer',
      args: [crownsContractAddress, userOwnedTokenId, userOfferInPrice],
      onSuccess,
      onFail: (res: any) => {
        console.warn(`Oops! Failed to make offer (${config.marketplaceCanisterId})`, res);

        typeof onFailure === 'function' && onFailure();
      },
    };

    const batchTxRes = await (window as any)?.ic?.plug?.batchTransactions([
      WICP_APPROVE_MARKETPLACE,
      MKP_MAKE_OFFER_WICP,
    ]);

    if (!batchTxRes) {
      typeof onFailure === 'function' && onFailure();

      return;
    }

    return {
      id,
      amount,
    };
  } catch (err) {
    thunkAPI.dispatch(notificationActions.setErrorMessage((err as CommonError).message));
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
    thunkAPI.dispatch(notificationActions.setErrorMessage((err as CommonError).message));
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export const getTokenOffers = createAsyncThunk<
  // Return type of the payload creator
  // GetUserReceviedOffer | undefined,
  any | undefined,
  // First argument to the payload creator
  GetUserReceviedOfferParams,
  // Optional fields for defining the thunk api
  { state: RootState }
>('marketplace/getTokenOffers', async (params: GetUserReceviedOfferParams, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { userTokenIds, onSuccess, onFailure } = params;

  try {
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
    const result = await actorInstance.getTokenOffers(
      nonFungibleContractAddress,
      userTokenIds,
      );

    const parsedTokenOffers = parseGetTokenOffersresponse(result);

    if (!Array.isArray(result) || !result.length) return [];

    if (typeof onSuccess !== 'function') return;

    onSuccess(parsedTokenOffers);
  } catch (err) {
    thunkAPI.dispatch(notificationActions.setErrorMessage((err as CommonError).message));
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export default marketplaceSlice.reducer;

