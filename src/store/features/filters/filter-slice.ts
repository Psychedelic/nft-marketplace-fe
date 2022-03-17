import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../../store';

export interface CheckboxDataState {
  traitsTitle: string;
  traitsValue: string;
}

export interface ButtonFilterState {
  filterName: any;
  filterCategory: string;
}

export interface FilterState {
  defaultFilters: ButtonFilterState[];
  traitsFilters: CheckboxDataState[];
}

const initialState: FilterState = {
  defaultFilters: [],
  traitsFilters: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    applyFilter: (
      state,
      action: PayloadAction<ButtonFilterState>,
    ) => {
      state.defaultFilters.push(action.payload);
    },
    updateFilter: (
      state,
      action: PayloadAction<ButtonFilterState>,
    ) => {
      const filterIndex = state.defaultFilters.findIndex((appliedFilter) => appliedFilter.filterCategory === action.payload.filterCategory);
      state.defaultFilters[filterIndex].filterName = action.payload.filterName;
    },
    applytraitsFilters: (
      state,
      action: PayloadAction<CheckboxDataState>,
    ) => {
      state.traitsFilters.push(action.payload);
      state.defaultFilters.push({
        filterName: action.payload.traitsValue,
        filterCategory: action.payload.traitsTitle,
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
      const removedPriceFilter = state.traitsFilters.filter((appliedFilter) => appliedFilter.traitsValue !== action.payload);
      state.traitsFilters = removedPriceFilter;
    },
    // eslint-disable-next-line
    clearAllFilters: (state) => {
      state.defaultFilters = [];
      state.traitsFilters = [];
    },
  },
});

export const filterActions = filterSlice.actions;

export const selectFilterState = (state: RootState) => state.filter;

export default filterSlice.reducer;
