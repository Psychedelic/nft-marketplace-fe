import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { NFTMetadata } from '../../../declarations/nft';

// Define a type for the slice state
interface NFTSState {
  loadingNFTs: boolean;
  loadedNFTS: NFTMetadata[];
  failedToLoadNFTS: boolean;
  failedToLoadNFTSMessage: string;
}

// Define the initial state using that type
const initialState: NFTSState = {
  loadingNFTs: false,
  loadedNFTS: [],
  failedToLoadNFTS: false,
  failedToLoadNFTSMessage: '',
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
        state.failedToLoadNFTSMessage = '';
      }
    },
    setLoadedNFTS: (state, action: PayloadAction<NFTMetadata[]>) => {
      state.loadedNFTS = action.payload;
      state.loadingNFTs = false;
    },
    setFailedToLoadNFTS: (state, action: PayloadAction<string>) => {
      state.failedToLoadNFTSMessage = action.payload;
      state.failedToLoadNFTS = true;
      state.loadingNFTs = false;
    },
  },
});

export const nftsActions = nftsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNFTSState = (state: RootState) => state.nfts;

export default nftsSlice.reducer;
