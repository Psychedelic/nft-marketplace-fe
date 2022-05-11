import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { AppLog } from '../../../../utils/log';

export const getTokenTransactions = createAsyncThunk<
  NSKyasshuUrl.GetTokenTransactions | undefined,
  NSKyasshuUrl.GetTokenTransactions
>('table/getTokenTransactions', async ({ tokenId }) => {
  try {
    const response = await axios.get(
      KyasshuUrl.getTokenTransactions({ tokenId }),
    );

    console.log('[debug] table/getTokenTransactions: tokenId: response', tokenId, response);

    if (!response || response.statusText !== 'OK' || !('Items' in response.data)) {
      throw Error('Oops! Failed to get the token transactions');
    }

    return response.data.Items;
  } catch (error) {
    AppLog.error(error);
  }
});
