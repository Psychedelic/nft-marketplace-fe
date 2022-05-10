import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { notificationActions } from '../../errors';
import { AppLog } from '../../../../utils/log';

export const getCollectionData = createAsyncThunk<void>(
  'nfts/getCollectionData',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(
        KyasshuUrl.getCollectionData(),
      );
      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      console.log(response, 'collection data');
    } catch (error) {
      AppLog.error(error);
      dispatch(
        notificationActions.setErrorMessage(
          'Oops! Unable to fetch collection data',
        ),
      );
    }
  },
);
