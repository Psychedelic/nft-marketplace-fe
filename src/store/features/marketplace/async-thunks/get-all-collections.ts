import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import {
  marketplaceActions,
  marketplaceSlice,
} from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';
import { Collection } from '@psychedelic/jelly-js';

export const getAllCollections = createAsyncThunk<
  any | undefined,
  any
>(
  'marketplace/getCollections',
  async ({ collectionId }, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId,
      slice: marketplaceSlice,
    });

    const { dispatch } = thunkAPI;

    try {
      const jellyCollection: Collection[] =
        await jellyInstance.getCollections();

      dispatch(marketplaceActions.setCollections(jellyCollection));
    } catch (err) {
      AppLog.error(err);
    }
  },
);
