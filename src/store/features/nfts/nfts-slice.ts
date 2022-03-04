import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';
import { NFTMetadata } from '../../../declarations/nft';

// Define a type for the slice state
interface NFTSState {
  loadingNFTs: boolean;
  loadedNFTS: NFTMetadata[];
}

// Define the initial state using that type
const initialState: NFTSState = {
  loadingNFTs: false,
  loadedNFTS: [],
};

export const nftsSlice = createSlice({
  name: 'nfts',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsNFTSLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingNFTs = action.payload;
    },
    setLoadedNFTS: (state, action: PayloadAction<NFTMetadata[]>) => {
      state.loadedNFTS = action.payload;
      state.loadingNFTs = false;
    },
  },
});

export const nftsActions = nftsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectNFTSState = (state: RootState) => state.nfts;

export default nftsSlice.reducer;
