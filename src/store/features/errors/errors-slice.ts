import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface ErrorState {
  nftsErrorMessage: string;
  plugErrorMessage: string;
  filtersErrorMessage: string;
}

const initialState: ErrorState = {
  nftsErrorMessage: '',
  plugErrorMessage: '',
  filtersErrorMessage: '',
};

export const errorSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setNftErrorMessage: (state, action: PayloadAction<string>) => {
      state.nftsErrorMessage = action.payload;
    },
    setPlugErrorMessage: (state, action: PayloadAction<string>) => {
      state.plugErrorMessage = action.payload;
    },
    setFiltersErrorMessage: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.filtersErrorMessage = action.payload;
    },
  },
});

export const errorActions = errorSlice.actions;

export const selectErrorState = (state: RootState) => state.errors;

export default errorSlice.reducer;
