import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import {
  KyasshuUrl,
  NSKyasshuUrl,
} from '../../../../integrations/kyasshu';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';
import { marketplaceActions } from '../../marketplace/marketplace-slice';

export const getCollectionData = createAsyncThunk<
  void,
  NSKyasshuUrl.GetCollectionDataQueryParams
>(
  'nfts/getCollectionData',
  async ({ collectionId }, { dispatch }) => {
    dispatch(nftsActions.setCollectionDataLoading());

    try {
      const response = await axios.get(
        KyasshuUrl.getCollectionData({ collectionId }),
      );
      if (response.status !== 200) {
        throw Error(response.statusText);
      }

      const responseData = response?.data;

      const actionPayload = {
        itemsCount: responseData?.items || 0,
        ownersCount: responseData?.owners || 0,
        price: 0,
        totalVolume: 0,
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

      await dispatch(
        marketplaceActions.getCollections({
          onSuccess: (collections) => {
            if (!collections.length) return;

            const crownsCollection = collections[0];

            actionPayload.totalVolume = Number(
              crownsCollection?.fungibleVolume,
            );
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
