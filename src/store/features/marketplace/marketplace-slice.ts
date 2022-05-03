/* eslint-disable */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import marketplaceIdlService from '../../../declarations/marketplace';
// import crownsIdlService from '../../../declarations/nft';
import { actorInstanceHandler } from '../../../integrations/actor';
import crownsIdlFactory from '../../../declarations/nft.did';
import marketplaceIdlFactory from '../../../declarations/marketplace.did';
import { Listing } from '../../../declarations/marketplace';
import wicpIdlFactory from '../../../declarations/wicp.did';
import config from '../../../config/env';
import { notificationActions } from '../errors';
import { RootState } from '../../store';
import { OwnerTokenIdentifiers } from '../../features/crowns/crowns-slice';
// import { crownsSlice } from '../crowns/crowns-slice';
// import { wicpSlice } from '../wicp/wicp-slice';
import { parseGetTokenOffersresponse } from '../../../utils/parser';
import { getICPPrice } from '../../../integrations/marketplace/price.utils';

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
  price: string;
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
  offerPrice: string;
};

interface GetUserReceviedOfferParams extends GetUserReceviedOffer {
  onSuccess?: (offers: any) => void;
  onFailure?: () => void;
}

type GetUserReceviedOffer = {
  ownerTokenIdentifiers?: OwnerTokenIdentifiers,
};

type RecentyListedForSale = MakeListing[];

type MarketplaceActor = ActorSubclass<marketplaceIdlService>;

type InitialState = {
  recentlyListedForSale: RecentyListedForSale;
  recentlyCancelledItems: any,
  recentlyAcceptedOffers: any[],
  actor?: MarketplaceActor;
  tokenListing: Record<string, Listing>;
};

const initialState: InitialState = {
  recentlyListedForSale: [],
  recentlyCancelledItems: [],
  recentlyAcceptedOffers: [],
  tokenListing: {},
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

    builder.addCase(getTokenListing.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.tokenListing = {
        ...state.tokenListing,
        ...action.payload,
      };
    });

    builder.addCase(cancelListing.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.recentlyCancelledItems.push(action.payload?.id);
    });

    builder.addCase(acceptOffer.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.recentlyAcceptedOffers.push(action.payload);
    });  
  },
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

    const MKP_MAKE_LISTING = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'makeListing',
      args: [nonFungibleContractAddress, userOwnedTokenId, userListForPrice],
      onSuccess,
      onFail: (res: any) => {
        console.warn('Oops! Failed to make listing', res);

        typeof onFailure === 'function' && onFailure();
      },
    };

    const batchTxRes = await (window as any)?.ic?.plug?.batchTransactions([
      CROWNS_APPROVE_MARKETPLACE,
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
  const { tokenId, price, onSuccess, onFailure } = params;

  const marketplaceCanisterId = Principal.fromText(config.marketplaceCanisterId);
  const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
  
  try {
    if (!price) throw Error("Oops! Missing price");

    const wicpAmount = BigInt(price);
    const WICP_APPROVE = {
      idl: wicpIdlFactory,
      canisterId: config.wICPCanisterId,
      methodName: 'approve',
      args: [marketplaceCanisterId, wicpAmount],
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
      // MKP_DEPOSIT_WICP,
      MKP_DIRECT_BUY,
    ]);

    if (!batchTxRes) {
      typeof onFailure === 'function' && onFailure();

      return;
    }

    return {
      tokenId,
      price,
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
    const MKP_CANCEL_LISTING = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'cancelListing',
      args: [nonFungibleContractAddress, userOwnedTokenId],
      onFail: (res: any) => {
        console.warn('Oops! Failed to withdraw NFT', res);

        typeof onFailure === 'function' && onFailure();
      },
      onSuccess,
    };

    const batchTxRes = await (window as any)?.ic?.plug?.batchTransactions([
      MKP_CANCEL_LISTING,
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
  const { id, buyerPrincipalId, offerPrice, onSuccess, onFailure } = params;

  try {
    const marketplaceCanisterId = Principal.fromText(config.marketplaceCanisterId);
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
    const userOwnedTokenId = BigInt(id);
    const buyerAddress = Principal.fromText(buyerPrincipalId);

    const offerInPrice = BigInt(offerPrice);

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

    const MKP_MAKE_LISTING = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'makeListing',
      args: [nonFungibleContractAddress, userOwnedTokenId, offerInPrice],
      onSuccess,
      onFail: (res: any) => {
        console.warn('Oops! Failed to make listing', res);

        typeof onFailure === 'function' && onFailure();
      },
    };
    
    const MKP_ACCEPT_OFFER = {
      idl: marketplaceIdlFactory,
      canisterId: config.marketplaceCanisterId,
      methodName: 'acceptOffer',
      args: [nonFungibleContractAddress, userOwnedTokenId, buyerAddress],
      onSuccess,
      onFail: (res: any) => {
        console.warn('Oops! Failed to accept offer', res);

        typeof onFailure === 'function' && onFailure();
      },
    };

    const batchTxRes = await (window as any)?.ic?.plug?.batchTransactions([
      CROWNS_APPROVE_MARKETPLACE,
      MKP_MAKE_LISTING,
      MKP_ACCEPT_OFFER,
    ]);

    if (!batchTxRes) {
      typeof onFailure === 'function' && onFailure();

      return;
    }

    return {
      id,
      buyerPrincipalId,
      offerPrice,
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

  const { ownerTokenIdentifiers, onSuccess, onFailure } = params;

  try {
    let floorDifferencePrice;
    let currencyMarketPrice = undefined;
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
    const result = await actorInstance.getTokenOffers(
      nonFungibleContractAddress,
      ownerTokenIdentifiers,
      );

    // Floor Difference calculation
    const floorDifferenceResponse = await actorInstance.getFloor(nonFungibleContractAddress);
    if (('Ok' in floorDifferenceResponse)) {
      floorDifferencePrice = floorDifferenceResponse.Ok.toString();
    }

    // Fetch ICP Price
    const icpPriceResponse = await getICPPrice();
    if (icpPriceResponse && icpPriceResponse.usd) {
      currencyMarketPrice = icpPriceResponse.usd;
    }

    const parsedTokenOffers = parseGetTokenOffersresponse({
      data: result,
      floorDifferencePrice,
      currencyMarketPrice
    });

    if (!Array.isArray(result) || !result.length) return [];

    if (typeof onSuccess !== 'function') return;

    onSuccess(parsedTokenOffers);
  } catch (err) {
    thunkAPI.dispatch(notificationActions.setErrorMessage((err as CommonError).message));
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});

export const getTokenListing = createAsyncThunk<
  // Return type of the payload creator
  // GetUserReceviedOffer | undefined,
  any | undefined,
  // First argument to the payload creator
  any,
  // Optional fields for defining the thunk api
  { state: RootState }
>('marketplace/getTokenListing', async (params: any, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { id: tokenId } = params;

  try {
    const nonFungibleContractAddress = Principal.fromText(config.crownsCanisterId);
    const result = await actorInstance.getTokenListing(
      nonFungibleContractAddress,
      BigInt(tokenId),
    );

    if (!('Ok' in result)) {
      console.warn(`Oops! Failed to get token listing for id ${tokenId}`);
      
      return {
        [tokenId]: {}
      };
    }

    return {
      [tokenId]: result['Ok'],
    };
  } catch (err) {
    thunkAPI.dispatch(notificationActions.setErrorMessage((err as CommonError).message));
  }
});


export default marketplaceSlice.reducer;

