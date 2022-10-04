import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JellyUtils, Collection } from '@psychedelic/jelly-js';
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
  getCollections,
  getAssetsToWithdraw,
  withdrawFungible,
  getNFTOffers,
  getUserOffers,
  getAllCollections,
  getCollectionDetails,
} from './async-thunks';
import { TransactionStatus } from '../../../constants/transaction-status';

interface TransactionStepsStatus {
  approveWICPStatus?: string;
  listingStatus?: string;
  makeOfferStatus?: string;
  saleStatus?: string;
  acceptOfferStatus?: string;
}

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

export type CurrentCollectionDetails = {
  marketplaceId?: string;
  collectionId?: string;
};

type RecentyListedForSale = MakeListing[];

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
  jellyJsInstance?: JellyUtils;
  // TODO: NFT offers type
  nftOffers: any;
  collections: Collection[];
  collection_id: string | undefined;
  currentCollectionDetails: CurrentCollectionDetails;
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
  jellyJsInstance: undefined,
  nftOffers: [],
  collections: [],
  collection_id: '',
  currentCollectionDetails: {},
};

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
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
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
    },
    setCollectionId: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.collection_id = action.payload;
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
    builder.addCase(
      getCollectionDetails.fulfilled,
      (state, action) => {
        if (!action.payload) return;

        state.currentCollectionDetails = action.payload;
      },
    );
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
  getCollections,
  getAssetsToWithdraw,
  withdrawFungible,
  getNFTOffers,
  getUserOffers,
  getAllCollections,
  getCollectionDetails,
};

export default marketplaceSlice.reducer;
