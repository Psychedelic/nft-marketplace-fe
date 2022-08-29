import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export interface OnboardingState {
  collectionDetails: {
    logo: string;
    featured: string;
    banner: string;
    name: string;
    description: string;
    url: string;
    website: string;
    discord: string;
    twitter: string;
    royalties: string;
    formErrors: {
      logo: string;
      name: string;
      royalties: string;
      error: boolean;
    };
  };
  nftDetails: {
    nftOne: string;
    nftTwo: string;
    nftThree: string;
    name: string;
    externalLink: string;
    description: string;
    collection: string;
    supply: string;
    blockchain: string;
    formErrors: {
      name: string;
      supply: string;
      error: boolean;
    };
  };
}

const initialState: OnboardingState = {
  collectionDetails: {
    logo: '',
    featured: '',
    banner: '',
    name: '',
    description: '',
    url: '',
    website: '',
    discord: '',
    twitter: '',
    royalties: '',
    formErrors: {
      logo: '',
      name: '',
      royalties: '',
      error: false,
    },
  },
  nftDetails: {
    nftOne: '',
    nftTwo: '',
    nftThree: '',
    name: '',
    externalLink: '',
    description: '',
    collection: '',
    supply: '',
    blockchain: '',
    formErrors: {
      name: '',
      supply: '',
      error: false,
    },
  },
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCollectionDetails: (state, action: PayloadAction<any>) => {
      state.collectionDetails = action.payload;
    },
    setNftDetails: (state, action: PayloadAction<any>) => {
      state.nftDetails = action.payload;
    },
  },
});

export const onboardingActions = {
  ...onboardingSlice.actions,
};

export const selectOnboardingState = (state: RootState) =>
  state.onboarding;

export default onboardingSlice.reducer;
