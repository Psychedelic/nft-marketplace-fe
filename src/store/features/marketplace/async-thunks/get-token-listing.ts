import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { actorInstanceHandler } from '../../../../integrations/actor';
import { marketplaceSlice } from '../marketplace-slice';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';

export const getTokenListing = createAsyncThunk<any | undefined, any>(
  'marketplace/getTokenListing',
  async ({ collectionId, id, onSuccess, onFailure }, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId: collectionId.toString(),
      slice: marketplaceSlice,
    });

    console.log(
      '[debug] collectionId.toString()',
      collectionId.toString(),
    );

    console.log('[debug] id', id);

    const collection = await getJellyCollection({
      jellyInstance,
      collectionId: collectionId.toString(),
    });

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    const jellyCollection = await jellyInstance.getJellyCollection(
      collection,
    );

    try {
      const result = await jellyCollection.getNFTs({
        ids: [id],
      });

      console.log('[debug] result', result);

      const { data, ok } = result;

      console.log('[debug] marketplace/getTokenListing: data:', data);

      console.log('[debug] marketplace/getTokenListing: ok:', ok);

      if (!ok)
        throw Error(`Oops! Failed to get token listing for id ${id}`);

      const item = data.pop();
      const { listing } = item;

      if (!listing) throw Error('Oops! Listing not found!');

      const isListedToSell =
        listing.price > 0 &&
        listing.status.toLowerCase() === 'created';

      if (!isListedToSell) throw Error('Oops! Invalid listing');

      onSuccess();

      return {
        [id]: item,
      };
    } catch (err) {
      AppLog.error(err);

      if (typeof onFailure === 'function') onFailure(err);

      return {
        [id]: {},
      };
    }
  },
);
