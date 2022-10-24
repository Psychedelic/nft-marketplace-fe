import { createAsyncThunk } from '@reduxjs/toolkit';
import { JellyCollection } from '@psychedelic/jelly-js';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import {
  marketplaceActions,
  marketplaceSlice,
} from '../../marketplace/marketplace-slice';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';
import config from '../../../../config/env';

export const getProtocolFee = createAsyncThunk<any | undefined, any>(
  'marketplace/getProtocolFee',
  async ({ collectionId }, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance

    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      slice: marketplaceSlice,
    });

    const { dispatch } = thunkAPI;

    try {
      const collection = await getJellyCollection({
        jellyInstance,
        collectionId: collectionId || config.icnsCollectionId,
      });

      if (!collection)
        throw Error(`Oops! collection ${collectionId} not found!`);

      const jellyCollection: JellyCollection =
        await jellyInstance.getJellyCollection(collection);

      const res = await jellyCollection.getProtocolFee();

      dispatch(marketplaceActions.setProtocolFee(res));

      return res;
    } catch (err) {
      AppLog.error(err);
    }
  },
);
