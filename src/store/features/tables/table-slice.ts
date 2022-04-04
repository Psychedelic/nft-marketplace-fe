import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface TableState {
  loadedCapActivityData: Array<object>;
  loadingTableData: boolean;
  failedToLoadTableData: boolean;
  hasMoreData: boolean;
  nextPageNo: number;
}

interface LoadedTableData {
  loadedCapActivityTableData: Array<object>;
  totalPages: number;
  total: number;
  nextPage: number;
}

const initialState: TableState = {
  loadedCapActivityData: [],
  loadingTableData: false,
  failedToLoadTableData: false,
  hasMoreData: false,
  nextPageNo: 0,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setIsTableDataLoading: (state, action: PayloadAction<boolean>) => {
      state.loadingTableData = action.payload;
      if (state.failedToLoadTableData) {
        state.failedToLoadTableData = false;
      }
    },
    setCapActivityTable: (
      state,
      action: PayloadAction<LoadedTableData>,
    ) => {
      const { nextPage, totalPages, loadedCapActivityTableData } = action.payload;
      state.loadingTableData = false;
      if (nextPage === 0) {
        console.log('nextPage', 0);
        state.loadedCapActivityData = loadedCapActivityTableData;
      } else {
        console.log('nextPage', nextPage);
        state.loadedCapActivityData.push(...loadedCapActivityTableData);
      }
      if (nextPage > totalPages) {
        state.hasMoreData = true;
        state.nextPageNo = nextPage;
      } else {
        state.hasMoreData = false;
      }
    },
    setFailedToLoadTableData: (state, action: PayloadAction<boolean>) => {
      state.failedToLoadTableData = !action.payload;
      state.loadingTableData = action.payload;
    },
  },
});

export const tableActions = tableSlice.actions;

export const selectTableState = (state: RootState) => state.table;

export default tableSlice.reducer;
