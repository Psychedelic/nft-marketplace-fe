import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import {
  getCAPActivity,
  getTokenMetadata,
  getTokenTransactions,
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
}

export interface CapActivityParams {
  pageCount: number;
  bucketId: string;
}

export type TokenMetadataById = Record<string, string>;

interface LoadedTableData {
  loadedCapActivityTableData: Array<object>;
  totalPages: number;
  total: number;
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
      const { nextPage, totalPages, loadedCapActivityTableData } =
        action.payload;
      state.loadingTableData = false;
      if (nextPage === 0) {
        state.loadedCapActivityData = loadedCapActivityTableData;
      } else {
        state.loadedCapActivityData.push(
          ...loadedCapActivityTableData,
        );
      }
      if (nextPage > totalPages) {
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
};

export const selectTableState = (state: RootState) => state.table;

export default tableSlice.reducer;
