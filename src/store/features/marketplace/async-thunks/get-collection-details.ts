import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import {
  marketplaceSlice,
  CollectionDetails,
} from '../marketplace-slice';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';

type GetCollectionDetailsProps = CollectionDetails;

export const getCollectionDetails = createAsyncThunk<
  any | undefined,
  GetCollectionDetailsProps
>(
  'marketplace/getCollectionDetails',
  async ({ collectionId }, thunkAPI) => {
    try {
      // Checks if an actor instance exists already
      // otherwise creates a new instance
      const jellyInstance = await jellyJsInstanceHandler({
        thunkAPI,
        slice: marketplaceSlice,
      });

      const collection = await getJellyCollection({
        jellyInstance,
        collectionId,
      });

      if (!collection)
        throw Error(`Oops! collection ${collectionId} not found!`);

      if (!collection?.marketplaceId)
        throw Error(
          `Oops! marketplace id ${collection?.marketplaceId} not found!`,
        );

      const currentCollectionDetails = {
        marketplaceId: collection.marketplaceId.toString(),
        collectionId: collection.id.toString(),
      };

      return currentCollectionDetails;
    } catch (err) {
      AppLog.error(err);
      thunkAPI.dispatch(
        notificationActions.setErrorMessage(
          `Oops! Failed to get collection details`,
        ),
      );

      return {};
    }
  },
);

