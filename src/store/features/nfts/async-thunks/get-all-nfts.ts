import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { marketplaceSlice } from '../marketplace-slice';
import { AppLog } from '../../../../utils/log';

export const getAllNFTs = createAsyncThunk<any | undefined, any>(
  'marketplace/getAllNFTs',
  async (params: any, thunkAPI) => {
    const { collectionId, onFailure, onSuccess } = params;

    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId,
      slice: marketplaceSlice,
    });

    try {
      const { data } = await jellyInstance.getAllNFTs();

      if (typeof onSuccess !== 'function') return;

      if (!data) {
        AppLog.warn('Oops! Failed to get all NFTs via Jelly-js!');

        onSuccess();

        return [];
      }

      onSuccess();

      return data;
    } catch (err) {
      AppLog.error(err);
      if (typeof onFailure === 'function') {
        onFailure(err);
      }
    }
  },
);

