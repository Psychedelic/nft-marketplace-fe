import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { getCAPActivity, getTokenMetadata } from './async-thunks';

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
}

export interface CapActivityParams {
  pageCount: number;
}

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
    setTableMetadata: (state, action: PayloadAction<string>) => {
      state.loadedTableMetaData.media = action.payload;
    },
  },
});

export const tableActions = {
  ...tableSlice.actions,
  getCAPActivity,
  getTokenMetadata,
};

export const selectTableState = (state: RootState) => state.table;

export default tableSlice.reducer;
