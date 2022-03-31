import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface TableState {
  loadedCapActivityTableData: Array<object>;
}

const initialState: TableState = {
  loadedCapActivityTableData: [],
};

export type FetchCAPActivityProps = {
  dispatch: any;
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setCapActivityTable: (
      state,
      action: PayloadAction<Array<object>>,
    ) => {
      state.loadedCapActivityTableData = action.payload;
    },
  },
});

export const tableActions = tableSlice.actions;

export const selectTableState = (state: RootState) => state.table;

export default tableSlice.reducer;
