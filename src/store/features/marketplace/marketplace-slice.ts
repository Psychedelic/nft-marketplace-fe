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
  directBuy,
  getTokenOffers,
  makeOffer,
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
}

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
  recentlyCancelledItems: any;
  recentlyAcceptedOffers: any[];
  actor?: MarketplaceActor;
  tokenListing: Record<string, Listing>;
};

const initialState: InitialState = {
  recentlyListedForSale: [],
  recentlyCancelledItems: [],
  recentlyAcceptedOffers: [],
  tokenListing: {},
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

export const marketplaceActions = {
  ...marketplaceSlice.actions,
  acceptOffer,
  cancelListing,
  directBuy,
  getBuyerOffers,
  getTokenListing,
  getTokenOffers,
  makeListing,
  makeOffer,
};

export default marketplaceSlice.reducer;
