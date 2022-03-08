import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface FilterState {
  filterName: any;
  filterCategory: string;
}

const initialState: FilterState[] = [];

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    applyFilter: (state, action: PayloadAction<FilterState>) => {
      state.push(action.payload);
    },
    updateFilter: (state, action: PayloadAction<FilterState>) => {
      const filterIndex = state.findIndex((appliedFilter) => appliedFilter.filterCategory === action.payload.filterCategory);
      state[filterIndex].filterName = action.payload.filterName;
    },
    removeFilter: (state, action: PayloadAction<string>) => state.filter((appliedFilter) => appliedFilter.filterName !== action.payload),
    removePriceFilter: (state, action: PayloadAction<string>) => state.filter((appliedFilter) => appliedFilter.filterCategory !== action.payload),
  },
});

export const filterActions = filterSlice.actions;

export const selectFilterState = (state: RootState) => state.filter;

export default filterSlice.reducer;
