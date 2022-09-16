import { createAsyncThunk } from '@reduxjs/toolkit';
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

      const { ok } = result;

      if (!ok)
        throw Error(`Oops! Failed to get token listing for id ${id}`);

      const item = result.data?.pop();
      const listing = item?.listing;

      if (!listing) throw Error('Oops! Listing not found!');

      const isListedToSell =
        listing.price > 0 &&
        listing.status.toLowerCase() === 'created';

      if (!isListedToSell) throw Error('Oops! Invalid listing');

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      typeof onSuccess === 'function' && onSuccess();

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
