import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface CheckboxDataState {
  checkboxTitle: string;
  checkboxValue: string;
}

export interface ButtonFilterState {
  filterName: any;
  filterCategory: string;
}

export interface FilterState {
  defaultFilters: ButtonFilterState[];
  checkboxFilters: CheckboxDataState[];
}

const initialState: FilterState = {
  defaultFilters: [],
  checkboxFilters: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    applyFilter: (state, action: PayloadAction<ButtonFilterState>) => {
      state.defaultFilters.push(action.payload);
    },
    updateFilter: (state, action: PayloadAction<ButtonFilterState>) => {
      const filterIndex = state.defaultFilters.findIndex((appliedFilter) => appliedFilter.filterCategory === action.payload.filterCategory);
      state.defaultFilters[filterIndex].filterName = action.payload.filterName;
    },
    applyCheckboxFilters: (state, action: PayloadAction<CheckboxDataState>) => {
      state.checkboxFilters.push(action.payload);
      state.defaultFilters.push({
        filterName: action.payload.checkboxValue,
        filterCategory: action.payload.checkboxTitle,
      });
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      const removedFilter = state.defaultFilters.filter((appliedFilter) => appliedFilter.filterName !== action.payload);
      state.defaultFilters = removedFilter;
    },
    removePriceFilter: (state, action: PayloadAction<string>) => {
      const removedPriceFilter = state.defaultFilters.filter((appliedFilter) => appliedFilter.filterCategory !== action.payload);
      state.defaultFilters = removedPriceFilter;
    },
    removeCheckboxFilter: (state, action: PayloadAction<string>) => {
      const removedPriceFilter = state.checkboxFilters.filter((appliedFilter) => appliedFilter.checkboxValue !== action.payload);
      state.checkboxFilters = removedPriceFilter;
    },
    // eslint-disable-next-line
    clearAllFilters: (state) => {
      state.defaultFilters = [];
      state.defaultFilters = [];
    },
  },
});

export const filterActions = filterSlice.actions;

export const selectFilterState = (state: RootState) => state.filter;

export default filterSlice.reducer;
