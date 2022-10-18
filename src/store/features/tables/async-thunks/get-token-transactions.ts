import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { AppLog } from '../../../../utils/log';
import { parseTokenTransactions } from '../../../../utils/parser';
import { tableActions } from '../table-slice';

export const getTokenTransactions = createAsyncThunk<
  NSKyasshuUrl.GetTokenTransactions | undefined,
  NSKyasshuUrl.GetTokenTransactions
>(
  'table/getTokenTransactions',
  async ({ tokenId, collectionId }, { dispatch }) => {
    try {
      dispatch(tableActions.setIsNFTTableDataLoading(true));

      const response = await axios.get(
        KyasshuUrl.getTokenTransactions({ tokenId, collectionId }),
      );

      if (
        !response ||
        response.status !== 200 ||
        !('Items' in response.data)
      ) {
        AppLog.error(response);
        throw Error('Oops! Failed to get the token transactions');
      }

      const parsed = parseTokenTransactions({
        items: response.data.Items,
      });

      if (!parsed) {
        throw Error(
          'Oops! Failed to parse the token transactions response',
        );
      }

      dispatch(tableActions.setIsNFTTableDataLoading(false));

      return parsed;
    } catch (error) {
      AppLog.error(error);

      throw error;
    }
  },
);
