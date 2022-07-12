import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import marketplaceIdlService, {
  Listing,
} from '../../../declarations/marketplace';
import { OwnerTokenIdentifiers } from '../crowns/crowns-slice';
import {
  acceptOffer,
  getBuyerOffers,
  getTokenListing,
  makeListing,
  cancelListing,
  cancelOffer,
  directBuy,
  getTokenOffers,
  makeOffer,
  getFloorPrice,
  getCollections,
  getAssetsToWithdraw,
  withdrawFungible,
} from './async-thunks';

export type MakeListing = {
  id: string;
  amount: string;
};

export type DirectBuy = {
  tokenId: BigInt;
  price: string;
};

export type CancelListing = {
  id: string;
};

export type MakeOffer = {
  id: string;
  amount: string;
};

export type AcceptOffer = {
  id: string;
  buyerPrincipalId: string;
  offerPrice: string;
};

export type CancelOffer = {
  id: string;
};

export type GetUserReceivedOffer = {
  ownerTokenIdentifiers?: OwnerTokenIdentifiers;
};

export type GetBuyerOffers = {
  userPrincipalId: string;
};

type RecentyListedForSale = MakeListing[];

type MarketplaceActor = ActorSubclass<marketplaceIdlService>;

type InitialState = {
  recentlyListedForSale: RecentyListedForSale;
  // TODO: the recently* should be typed
  // as we know which types it has
  recentlyCancelledItems: any;
  recentlyCancelledOffers: any;
  recentlyAcceptedOffers: any[];
  actor?: MarketplaceActor;
  tokenListing: Record<string, Listing>;
  tokenOffers: any[];
  recentlyMadeOffers: any[];
  recentlyPurchasedTokens: any[];
  recentlyWithdrawnAssets: any[];
  sumOfUserAllowance: number;
  recentlyFailedTransactions: string[];
  offersLoaded: boolean;
};

const initialState: InitialState = {
  recentlyListedForSale: [],
  recentlyCancelledItems: [],
  recentlyCancelledOffers: [],
  recentlyAcceptedOffers: [],
  tokenListing: {},
  tokenOffers: [],
  recentlyMadeOffers: [],
  recentlyPurchasedTokens: [],
  recentlyWithdrawnAssets: [],
  sumOfUserAllowance: 0,
  recentlyFailedTransactions: [],
  offersLoaded: false,
};

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    setActor: (state, action: PayloadAction<MarketplaceActor>) => {
      state.actor = action.payload;
    },
    setSumOfUserAllowance: (state, action: PayloadAction<number>) => {
      state.sumOfUserAllowance = action.payload;
    },
    setFailedTransactions: (state, action: PayloadAction<string>) => {
      if (!action.payload) return;

      state.recentlyFailedTransactions.push(action.payload);
    },
    setOffersLoaded: (state, action: PayloadAction<boolean>) => {
      if (!action.payload) return;

      state.offersLoaded = action.payload;
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

    builder.addCase(cancelOffer.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.recentlyCancelledOffers.push(action.payload?.id);
    });

    builder.addCase(acceptOffer.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.recentlyAcceptedOffers.push(action.payload);
    });
    builder.addCase(getTokenOffers.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.tokenOffers = action.payload;
    });
    builder.addCase(makeOffer.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.recentlyMadeOffers.push(action.payload);
    });
    builder.addCase(directBuy.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.recentlyPurchasedTokens.push(action.payload);
    });
    builder.addCase(withdrawFungible.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.recentlyWithdrawnAssets.push(action.payload);
    });
  },
});

export const marketplaceActions = {
  ...marketplaceSlice.actions,
  acceptOffer,
  cancelListing,
  cancelOffer,
  directBuy,
  getBuyerOffers,
  getTokenListing,
  getTokenOffers,
  makeListing,
  makeOffer,
  getFloorPrice,
  getCollections,
  getAssetsToWithdraw,
  withdrawFungible,
};

export default marketplaceSlice.reducer;
