import { createAsyncThunk } from '@reduxjs/toolkit';
import { Collection } from '@psychedelic/jelly-js';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import {
  marketplaceActions,
  marketplaceSlice,
} from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';

export const getAllCollections = createAsyncThunk<any>(
  'marketplace/getCollections',
  async (_params, thunkAPI) => {
    console.log(
      '[debug] getAllCollections: process.env: ',
      process.env,
    );

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      slice: marketplaceSlice,
    });

    const { dispatch } = thunkAPI;

    try {
      const collections: Collection[] =
        await jellyInstance.getCollections();

      console.log(
        '[debug] getAllCollections: collections: ',
        collections,
      );

      dispatch(marketplaceActions.setCollections(collections));
    } catch (err) {
      AppLog.error(err);
    }
  },
);

