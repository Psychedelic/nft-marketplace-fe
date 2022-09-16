import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { NFTMetadata } from '../../../declarations/legacy';
import {
  getNFTDetails,
  getCollectionData,
  getAllNFTs,
  getMyNFTs,
} from './async-thunks';

// Define a type for the slice state
interface NFTSState {
  loadingNFTs: boolean;
  loadedNFTS: NFTMetadata[];
  failedToLoadNFTS: boolean;
  failedToLoadNFTSMessage: string;
  hasMoreNFTs?: boolean;
  nextPageNo: number;
  loadingCollectionData: boolean;
  totalNFTSCount: number;
  totalOwnersCount: number;
  floorPrice: number;
  totalVolume: number;
  allNFTs: any[];
  lastIndexValue: number | undefined;
}

// Define the initial state using that type
const initialState: NFTSState = {
  loadingNFTs: false,
  loadedNFTS: [],
  failedToLoadNFTS: false,
  failedToLoadNFTSMessage: '',
  nextPageNo: 0,
  loadingCollectionData: false,
  totalNFTSCount: 0,
  totalOwnersCount: 0,
  floorPrice: 0,
  totalVolume: 0,
  allNFTs: [],
  lastIndexValue: undefined,
};

export interface LoadedNFTData {
  loadedNFTList: NFTMetadata[];
  totalPages?: number;
  total: number;
  nextPage?: number;
  lastIndex?: number;
}

interface ListedNFTData {
  id: string;
  amount: string;
}
interface CancelNFTFromListingData {
  id: string;
}

interface AcceptedNFTOfferData {
  id: string;
  buyerId: string;
}

interface FindNFTIndexData {
  nftList: NFTMetadata[];
  idToFind: string;
}

interface LoadedCollectionData {
  itemsCount: number;
  ownersCount: number;
  price: number;
  totalVolume: number;
}

const findNFTIndex = ({ nftList, idToFind }: FindNFTIndexData) => {
  if (!nftList || !idToFind) {
    return -1;
  }

  const index = nftList.findIndex((nft) => nft.id === idToFind);

  return index;
};

export const nftsSlice = createSlice({
  name: 'nfts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsNFTSLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingNFTs = action.payload;
      if (state.failedToLoadNFTS) {
        state.failedToLoadNFTS = false;
      }
    },
    setLoadedNFTS: (state, action: PayloadAction<LoadedNFTData>) => {
      const { loadedNFTList, nextPage, lastIndex } = action.payload;
      state.loadingNFTs = false;
      state.lastIndexValue = Number(lastIndex);

      state.loadedNFTS.push(...loadedNFTList);

      if (nextPage) {
        state.hasMoreNFTs = true;
        state.nextPageNo = nextPage;
      } else {
        state.hasMoreNFTs = false;
      }
    },
    clearLoadedNFTS: (state) => {
      state.loadedNFTS = [];
      // Only defined once checked at least once
      state.hasMoreNFTs = undefined;
      state.nextPageNo = 0;
    },
    setFailedToLoadNFTS: (state, action: PayloadAction<boolean>) => {
      state.failedToLoadNFTS = !action.payload;
      state.loadingNFTs = action.payload;
    },
    setLoadedNFTDetails: (
      state,
      action: PayloadAction<NFTMetadata>,
    ) => {
      const { id } = action.payload;
      const index = state.loadedNFTS.findIndex(
        (nft) => nft.id === id,
      );

      if (index > -1) {
        state.loadedNFTS[index] = action.payload;

        return;
      }

      state.loadedNFTS.push(action.payload);
    },
    setNFTForSale: (state, action: PayloadAction<ListedNFTData>) => {
      const { id, amount } = action.payload;
      const index = findNFTIndex({
        nftList: state.loadedNFTS,
        idToFind: id,
      });

      if (index < 0) return;

      state.loadedNFTS[index].isListed = true;
      state.loadedNFTS[index].price = amount;
    },
    // TODO: Do not change the state manually,
    // if required query from the API and update the global state
    // as ultimately you DO NOT WANT to manage state, which is difficult
    // specially when you have two sources, the application state which
    // is somehow detached from the API state, which is the source
    cancelNFTFromListing: (
      state,
      action: PayloadAction<CancelNFTFromListingData>,
    ) => {
      const { id } = action.payload;
      const index = findNFTIndex({
        nftList: state.loadedNFTS,
        idToFind: id,
      });

      if (index < 0) return;

      state.loadedNFTS[index].isListed = false;
    },
    acceptNFTOffer: (
      state,
      action: PayloadAction<AcceptedNFTOfferData>,
    ) => {
      const { id, buyerId } = action.payload;
      const index = findNFTIndex({
        nftList: state.loadedNFTS,
        idToFind: id,
      });

      if (index < 0) return;

      state.loadedNFTS[index].isListed = false;
      state.loadedNFTS[index].owner = buyerId;
    },
    setCollectionDataLoading: (state) => {
      state.loadingCollectionData = true;
    },
    setCollectionData: (
      state,
      action: PayloadAction<LoadedCollectionData>,
    ) => {
      const { itemsCount, ownersCount, price, totalVolume } =
        action.payload;
      state.totalNFTSCount = itemsCount;
      state.totalOwnersCount = ownersCount;
      state.floorPrice = price;
      state.totalVolume = totalVolume;
      state.loadingCollectionData = false;
    },
    setLastIndex: (
      state,
      action: PayloadAction<number | undefined>,
    ) => {
      state.lastIndexValue = action.payload;
    },
  },
});

export const nftsActions = {
  ...nftsSlice.actions,
  getNFTDetails,
  getCollectionData,
  getAllNFTs,
  getMyNFTs,
};

// Other code such as selectors can use the imported `RootState` type
export const selectNFTSState = (state: RootState) => state.nfts;

export default nftsSlice.reducer;
