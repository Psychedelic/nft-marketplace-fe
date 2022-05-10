import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { notificationActions } from '../../errors';
import { AppLog } from '../../../../utils/log';
import { marketplaceActions } from '../../marketplace/marketplace-slice';

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

      const responseData = response?.data;

      const actionPayload = {
        itemsCount: responseData?.items || 0,
        ownersCount: responseData?.owners || 0,
        price: 0,
      };

      await dispatch(
        marketplaceActions.getFloorPrice({
          onSuccess: (floorPrice) => {
            if (!floorPrice) return;

            actionPayload.price = floorPrice;
          },
          onFailure: () => {
            // TODO: handle failure scenario
          },
        }),
      );

      dispatch(nftsActions.setCollectionData(actionPayload));
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
