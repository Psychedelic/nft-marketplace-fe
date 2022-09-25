import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { marketplaceSlice } from '../../marketplace/marketplace-slice';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';
import { Collection } from '@psychedelic/jelly-js';
import { settingsActions } from '../settings-slice';

export const getCollections = createAsyncThunk<any | undefined, any>(
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

      dispatch(settingsActions.setCollections(jellyCollection));
    } catch (err) {
      AppLog.error(err);
    }
  },
);
