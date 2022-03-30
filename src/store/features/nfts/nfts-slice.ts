import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { NFTMetadata } from '../../../declarations/nft';

// Define a type for the slice state
interface NFTSState {
  loadingNFTs: boolean;
  loadedNFTS: NFTMetadata[];
  failedToLoadNFTS: boolean;
  failedToLoadNFTSMessage: string;
  hasMoreNFTs: boolean;
  nextPageNo: number;
}

// Define the initial state using that type
const initialState: NFTSState = {
  loadingNFTs: false,
  loadedNFTS: [],
  failedToLoadNFTS: false,
  failedToLoadNFTSMessage: '',
  hasMoreNFTs: false,
  nextPageNo: 0,
};

interface loadedNFTData {
  loadedNFTList: NFTMetadata[];
  totalPages: number;
  total: number;
  nextPage: number;
}

interface listedNFTData {
  id: string;
  amount: string;
}
interface cancelNFTFromListingData {
  id: string;
}

interface findNFTIndexData {
  nftList: NFTMetadata[];
  idToFind: string;
}

const findNFTIndex = ({ nftList, idToFind }: findNFTIndexData) => {
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
    setLoadedNFTS: (state, action: PayloadAction<loadedNFTData>) => {
      const { loadedNFTList, totalPages, nextPage } = action.payload;
      state.loadingNFTs = false;
      if (nextPage === 1) {
        state.loadedNFTS = loadedNFTList;
      } else {
        state.loadedNFTS.push(...loadedNFTList);
      }
      if (nextPage < totalPages) {
        state.hasMoreNFTs = true;
        state.nextPageNo = nextPage;
      } else {
        state.hasMoreNFTs = false;
      }
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
    setNFTForSale: (state, action: PayloadAction<listedNFTData>) => {
      const { id, amount } = action.payload;
      const index = findNFTIndex({
        nftList: state.loadedNFTS,
        idToFind: id,
      });

      if (index < 0) return;

      state.loadedNFTS[index].isListed = true;
      state.loadedNFTS[index].price = amount;
    },
    cancelNFTFromListing: (
      state,
      action: PayloadAction<cancelNFTFromListingData>,
    ) => {
      const { id } = action.payload;
      const index = findNFTIndex({
        nftList: state.loadedNFTS,
        idToFind: id,
      });

      if (index < 0) return;

      state.loadedNFTS[index].isListed = false;
    },
  },
});

export const nftsActions = nftsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNFTSState = (state: RootState) => state.nfts;

export default nftsSlice.reducer;
