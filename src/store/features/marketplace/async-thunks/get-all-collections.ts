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

    console.log('[debug] getAllCollections: bp: ', 1);

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      slice: marketplaceSlice,
    });

    console.log('[debug] getAllCollections: bp: ', 2);

    const { dispatch } = thunkAPI;

    console.log('[debug] getAllCollections: bp: ', 3);

    try {
      const collections: Collection[] =
        await jellyInstance.getCollections();

      console.log(
        '[debug] getAllCollections: collections: ',
        collections,
      );

      dispatch(marketplaceActions.setCollections(collections));
    } catch (err) {
      console.log('[debug] getAllCollections: bp: ', 4);

      AppLog.error(err);
    }
  },
);

