import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import {
  getCAPActivity,
  getTokenMetadata,
  getTokenTransactions,
  getUserActivity,
} from './async-thunks';

interface LoadedTableMetaData {
  media: string;
}

export interface TableState {
  loadedCapActivityData: Array<object>;
  loadedTableMetaData: LoadedTableMetaData;
  loadingTableData: boolean;
  failedToLoadTableData: boolean;
  hasMoreData: boolean;
  nextPageNo: number;
  tokenTransactions: any;
  loadingTokenTransactions: boolean;
  tokenMetadataById: TokenMetadataById;
  loadedUserActivityData: Array<object>;
}

export interface CapActivityParams {
  pageCount: string;
  bucketId: string;
}

export interface UserActivityParams {
  pageCount: string;
  bucketId: string;
  plugPrincipal: string;
}

export type TokenMetadataById = Record<string, string>;

interface LoadedTableData {
  loadedCapActivityTableData: Array<object>;
  currentPage: string;
  nextPage: number;
}

interface LoadedUserTableData {
  loadedUserActivityData: Array<object>;
  currentPage: string;
  nextPage: number;
}

const initialState: TableState = {
  loadedCapActivityData: [],
  loadedTableMetaData: {
    media: '',
  },
  loadingTableData: false,
  failedToLoadTableData: false,
  hasMoreData: false,
  nextPageNo: 0,
  tokenTransactions: [],
  loadingTokenTransactions: true,
  tokenMetadataById: {},
  loadedUserActivityData: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setIsTableDataLoading: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.loadingTableData = action.payload;
      if (state.failedToLoadTableData) {
        state.failedToLoadTableData = false;
      }
    },
    setCapActivityTable: (
      state,
      action: PayloadAction<LoadedTableData>,
    ) => {
      const { currentPage, nextPage, loadedCapActivityTableData } =
        action.payload;

      state.loadingTableData = false;

      if (currentPage === 'last') {
        state.loadedCapActivityData = loadedCapActivityTableData;
      } else {
        state.loadedCapActivityData.push(
          ...loadedCapActivityTableData,
        );
      }

      if (nextPage >= 0) {
        state.hasMoreData = true;
        state.nextPageNo = nextPage;
      } else {
        state.hasMoreData = false;
      }
    },
    setUserActivityTable: (
      state,
      action: PayloadAction<LoadedUserTableData>,
    ) => {
      const { currentPage, nextPage, loadedUserActivityData } =
        action.payload;

      state.loadingTableData = false;

      if (currentPage === 'last') {
        state.loadedUserActivityData = loadedUserActivityData;
      } else {
        state.loadedUserActivityData.push(...loadedUserActivityData);
      }

      if (nextPage >= 0) {
        state.hasMoreData = true;
        state.nextPageNo = nextPage;
      } else {
        state.hasMoreData = false;
      }
    },
    setFailedToLoadTableData: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.failedToLoadTableData = !action.payload;
      state.loadingTableData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTokenMetadata.fulfilled, (state, action) => {
      if (!action || !action.payload) return;

      state.tokenMetadataById = {
        ...state.tokenMetadataById,
        ...action.payload,
      };
    });

    builder.addCase(getTokenTransactions.pending, (state) => {
      state.tokenTransactions = initialState.tokenTransactions;
      state.loadingTokenTransactions = true;
    });

    builder.addCase(getTokenTransactions.rejected, (state) => {
      state.tokenTransactions = initialState.tokenTransactions;
    });

    builder.addCase(
      getTokenTransactions.fulfilled,
      (state, action) => {
        if (!action.payload) return;

        state.tokenTransactions = action.payload;
        state.loadingTokenTransactions = false;
      },
    );
  },
});

export const tableActions = {
  ...tableSlice.actions,
  getCAPActivity,
  getTokenMetadata,
  getTokenTransactions,
  getUserActivity,
};

export const selectTableState = (state: RootState) => state.table;

export default tableSlice.reducer;
