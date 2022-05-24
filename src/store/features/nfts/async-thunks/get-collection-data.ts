import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { nftsActions } from '../nfts-slice';
import { KyasshuUrl } from '../../../../integrations/kyasshu';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';
import { marketplaceActions } from '../../marketplace/marketplace-slice';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';

export const getCollectionData = createAsyncThunk<void>(
  'nfts/getCollectionData',
  async (_, { dispatch }) => {
    dispatch(nftsActions.setCollectionDataLoading());

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

            const fungibleVolume = parseE8SAmountToWICP(
              crownsCollection[1]?.fungible_volume,
            );

            actionPayload.totalVolume = Number(fungibleVolume);
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
