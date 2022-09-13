import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import {
  marketplaceActions,
  marketplaceSlice,
} from '../marketplace-slice';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';
import { parseNFTOffers } from '../../../../utils/parser';
import { getICPPrice } from '../../../../integrations/marketplace/price.utils';

// TODO: delete getTokenOffers thunk when getNFTOffers is ready
// to render NFT offers list

export const getNFTOffers = createAsyncThunk<any | undefined, any>(
  'marketplace/getNFTOffers',
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

    thunkAPI.dispatch(marketplaceActions.setOffersLoaded(false));

    try {
      let currencyMarketPrice;
      const result = await jellyCollection.getNFTs({
        ids: [id],
      });

      const { data, ok } = result;

      if (!ok)
        throw Error(`Oops! Failed to get token offers for id ${id}`);

      const item = data.pop();
      const { offers } = item;

      if (!offers) throw Error('Oops! Offers not found!');

      // TODO: get floor price and calculate floor difference

      // Fetch ICP Price
      const icpPriceResponse = await getICPPrice();
      if (icpPriceResponse && icpPriceResponse.usd) {
        currencyMarketPrice = icpPriceResponse.usd;
      }

      const parsedNFTOffers =
        !Array.isArray(offers) || !offers.length
          ? []
          : parseNFTOffers({
              offers,
              currencyMarketPrice,
            });

      typeof onSuccess === 'function' && onSuccess();

      thunkAPI.dispatch(marketplaceActions.setOffersLoaded(true));

      return parsedNFTOffers;
    } catch (err) {
      AppLog.error(err);
      thunkAPI.dispatch(
        notificationActions.setErrorMessage(
          `Oops! Failed to get token offers`,
        ),
      );
      if (typeof onFailure === 'function') {
        onFailure(err);
      }

      return [];
    }
  },
);
