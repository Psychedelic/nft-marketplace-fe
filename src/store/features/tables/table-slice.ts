import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../store';
import config from '../../../config/env';
import { getOperation } from '../../../integrations/kyasshu/utils';
import { dateRelative } from '../../../integrations/functions/date';

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

export const fetchCAPActivity = createAsyncThunk<
  FetchCAPActivityProps,
  { state: RootState }
>(
  'marketplace/getCapActivity',
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        `${config.kyasshuMarketplaceAPI}/cap/contract/txns/${config.marketplaceCanisterId}`,
      );
      const { Items } = response.data;

      const result = Items.map((item) => {
        const capData = {
          operation: getOperation(item.event.operation),
          time: dateRelative(item.event.time),
        };
        const { details } = item.event;
        details.forEach((detail) => {
          const [key, value] = detail;
          capData[key] = value.U64 ?? value;
        });
        return capData;
      });

      console.log('result', result);
      thunkAPI.dispatch(tableActions.setCapActivityTable(result));
    } catch (error) {
      console.log(error);
    }
  },
);

export const selectTableState = (state: RootState) => state.table;

export default tableSlice.reducer;
