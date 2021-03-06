import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NFTMetadata } from '../../../declarations/legacy';
import type { RootState } from '../../store';
import { getFilterTraits, getSearchResults } from './async-thunks';

export interface TraitsDataState {
  key: string;
  name: string;
  values: Array<string>;
}

export interface TraitValue {
  value: string;
  key: string;
}

export interface FilterTraitsList {
  name: string;
  values: Array<string>;
}

export interface ButtonFilterState {
  filterName: any;
  filterCategory: string;
}

export interface SearchResultDataState {
  id: number;
  name: string;
  price: string;
  wicpPrice: string;
  preview: string;
}

export interface FilterState {
  defaultFilters: ButtonFilterState[];
  traits: TraitsDataState[];
  loadedFiltersList: FilterTraitsList[];
  loadingFilterList: boolean;
  isMyNfts: boolean;
  sortBy: string;
  status: string;
  searchResults: SearchResultDataState[];
  isAlreadyFetched: boolean;
  loadingSearch: boolean;
}

const initialState: FilterState = {
  defaultFilters: [],
  traits: [],
  loadedFiltersList: [],
  loadingFilterList: false,
  isMyNfts: false,
  sortBy: 'lastModified',
  status: '',
  searchResults: [],
  isAlreadyFetched: false,
  loadingSearch: false,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    getAllFilters: (
      state,
      action: PayloadAction<FilterTraitsList>,
    ) => {
      state.loadedFiltersList.push(action.payload);
    },
    setIsFilterTraitsLoading: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.loadingFilterList = action.payload;
    },
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
      const filterIndex = state.defaultFilters.findIndex(
        (appliedFilter) =>
          appliedFilter.filterCategory ===
          action.payload.filterCategory,
      );
      state.defaultFilters[filterIndex].filterName =
        action.payload.filterName;
    },
    applytraits: (state, action: PayloadAction<TraitsDataState>) => {
      const traitsNameExists = state.traits.some(
        (trait) =>
          trait.name === action.payload.name &&
          trait.key === action.payload.key,
      );

      if (!traitsNameExists) {
        state.traits.push({
          key: action.payload.key,
          name: action.payload.name,
          values: [...action.payload.values],
        });
        state.defaultFilters.push({
          filterName: [...action.payload.values],
          filterCategory: action.payload.key,
        });

        return;
      }

      const traitsFilterIndex = state.traits.findIndex(
        (trait) =>
          trait.name === action.payload.name &&
          trait.key === action.payload.key,
      );

      state.traits[traitsFilterIndex].values.push(
        ...action.payload.values,
      );
      const traitName = state.traits[traitsFilterIndex].key;
      const defaultFiltersIndex = state.defaultFilters.findIndex(
        (filter) => filter.filterCategory === traitName,
      );
      // eslint-disable-next-line
      Array.isArray(
        state.defaultFilters[defaultFiltersIndex].filterName,
      ) &&
        state.defaultFilters[defaultFiltersIndex].filterName.push(
          ...action.payload.values,
        );
    },
    setMyNfts: (state, action: PayloadAction<boolean>) => {
      state.isMyNfts = action.payload;
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      const removedFilter = state.defaultFilters.filter(
        (appliedFilter) =>
          appliedFilter.filterName !== action.payload,
      );
      state.defaultFilters = removedFilter;
    },
    removePriceFilter: (state, action: PayloadAction<string>) => {
      const removedPriceFilter = state.defaultFilters.filter(
        (appliedFilter) =>
          appliedFilter.filterCategory !== action.payload,
      );
      state.defaultFilters = removedPriceFilter;
    },
    removeTraitsFilter: (
      state,
      action: PayloadAction<TraitValue>,
    ) => {
      const removedTraitsFilter = state.traits.map((trait) => {
        if (
          trait.values.includes(action.payload.value) &&
          trait.key === action.payload.key
        ) {
          const filteredTraitsValues = trait.values.filter(
            (t: string) => t !== action.payload.value,
          );
          return {
            ...trait,
            values: filteredTraitsValues,
          };
        }
        return trait;
      });

      const removedDefaultFilter = state.defaultFilters.map(
        (filter) => {
          if (filter.filterCategory === action.payload.key) {
            const filteredNames = Array.isArray(filter.filterName)
              ? filter.filterName.filter(
                  (f) => f !== action.payload.value,
                )
              : [];
            return !Array.isArray(filter.filterName)
              ? filter
              : {
                  ...filter,
                  filterName: filteredNames,
                };
          }

          return filter;
        },
      );
      state.traits = removedTraitsFilter.filter(
        (traits) => traits.values.length > 0,
      );
      state.defaultFilters = removedDefaultFilter.filter(
        (defaultFilter) =>
          !Array.isArray(defaultFilter.filterName) ||
          defaultFilter.filterName.length > 0,
      );
    },
    // eslint-disable-next-line
    clearAllFilters: (state) => {
      state.defaultFilters = [];
      state.traits = [];
      state.status = '';
    },
    setSortingFilter: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setSearchResults: (
      state,
      action: PayloadAction<SearchResultDataState[]>,
    ) => {
      state.searchResults = action.payload;
    },
    setIsAlreadyFetched: (state, action: PayloadAction<boolean>) => {
      state.isAlreadyFetched = action.payload;
    },
    setLoadingSearch: (state, action: PayloadAction<boolean>) => {
      state.loadingSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResults.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.searchResults = [...action.payload];
      state.loadingSearch = false;
    });
    builder.addCase(getSearchResults.pending, (state) => {
      state.loadingSearch = true;
      state.searchResults = [];
    });
    builder.addCase(getSearchResults.rejected, (state) => {
      state.loadingSearch = false;
      state.searchResults = [];
    });
  },
});

export const filterActions = {
  ...filterSlice.actions,
  getFilterTraits,
  getSearchResults,
};

export const selectFilterState = (state: RootState) => state.filter;

export default filterSlice.reducer;
