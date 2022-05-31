import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { AppLog } from '../../../../utils/log';
import { parseTokenTransactions } from '../../../../utils/parser';

export const getTokenTransactions = createAsyncThunk<
  NSKyasshuUrl.GetTokenTransactions | undefined,
  NSKyasshuUrl.GetTokenTransactions
>('table/getTokenTransactions', async ({ tokenId }) => {
  try {
    const response = await axios.get(
      KyasshuUrl.getTokenTransactions({ tokenId }),
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

    return parsed;
  } catch (error) {
    AppLog.error(error);
  }
});

