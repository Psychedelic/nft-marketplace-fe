import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActorSubclass } from '@dfinity/agent';
import marketplaceIdlService, {
  TransactionStepsStatus,
} from '../../../declarations/marketplace';
import {
  Listing,
  TokenData,
  LastSale,
} from '../../../declarations/marketplace-v2';
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
  getNFTOffers,
  getUserOffers,
} from './async-thunks';
import { TransactionStatus } from '../../../constants/transaction-status';

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
  collectionId: string;
};

export type CollectionDetails = {
  collectionId: string;
};

type RecentyListedForSale = MakeListing[];

type MarketplaceActor = ActorSubclass<marketplaceIdlService>;

type TokenListingItem = Omit<TokenData, 'listing' | 'last_sale'> & {
  listing: Listing;
  last_sale: LastSale;
};

type InitialState = {
  recentlyListedForSale: RecentyListedForSale;
  // TODO: the recently* should be typed
  // as we know which types it has
  recentlyCancelledItems: any;
  recentlyCancelledOffers: any;
  recentlyAcceptedOffers: any[];
  actor?: MarketplaceActor;
  tokenListing: Record<string, TokenListingItem>;
  tokenOffers: any[];
  offersReceived: any[];
  recentlyMadeOffers: any[];
  recentlyPurchasedTokens: any[];
  recentlyWithdrawnAssets: any[];
  sumOfUserAllowance: number;
  recentlyFailedTransactions: string[];
  offersLoaded: boolean;
  transactionSteps: TransactionStepsStatus;
  // TODO: jelly-js type
  jellyJsInstance: any;
  // TODO: NFT offers type
  nftOffers: any;
};

const defaultTransactionStatus = {
  approveWICPStatus: TransactionStatus.inProgress,
  listingStatus: TransactionStatus.notStarted,
  makeOfferStatus: TransactionStatus.notStarted,
  saleStatus: TransactionStatus.notStarted,
  acceptOfferStatus: TransactionStatus.notStarted,
};

const initialState: InitialState = {
  recentlyListedForSale: [],
  recentlyCancelledItems: [],
  recentlyCancelledOffers: [],
  recentlyAcceptedOffers: [],
  tokenListing: {},
  tokenOffers: [],
  offersReceived: [],
  recentlyMadeOffers: [],
  recentlyPurchasedTokens: [],
  recentlyWithdrawnAssets: [],
  sumOfUserAllowance: 0,
  recentlyFailedTransactions: [],
  offersLoaded: false,
  transactionSteps: defaultTransactionStatus,
  jellyJsInstance: {},
  nftOffers: [],
};

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    // TODO: deprecate setActor
    setActor: (state, action: PayloadAction<MarketplaceActor>) => {
      state.actor = action.payload;
    },
    // TODO: set correct type for jelly-js instance
    setJellyJsInstance: (state, action: PayloadAction<any>) => {
      state.jellyJsInstance = action.payload;
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
    setTransactionStepsToDefault: (state) => {
      state.transactionSteps = defaultTransactionStatus;
    },
    updateTransactionSteps: (
      state,
      action: PayloadAction<TransactionStepsStatus>,
    ) => {
      state.transactionSteps = {
        ...state.transactionSteps,
        ...action.payload,
      };
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
    builder.addCase(getUserOffers.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.offersReceived = action.payload;
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
    builder.addCase(getNFTOffers.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.nftOffers = action.payload;
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
  getNFTOffers,
  getUserOffers,
};

export default marketplaceSlice.reducer;
