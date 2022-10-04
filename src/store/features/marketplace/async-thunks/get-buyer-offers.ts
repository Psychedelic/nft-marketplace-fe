import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import {
  GetBuyerOffers,
  marketplaceSlice,
} from '../marketplace-slice';
import config from '../../../../config/env';
import { getICPPrice } from '../../../../integrations/marketplace/price.utils';
import { notificationActions } from '../../notifications';
import { parseOffersMadeResponse } from '../../../../utils/parser';
import { OffersTableItem } from '../../../../declarations/legacy';
import { AppLog } from '../../../../utils/log';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import { getJellyCollection } from '../../../../utils/jelly';
import { getPrincipal } from '../../../../integrations/plug';

export type GetBuyerOffersProps = DefaultCallbacks & GetBuyerOffers;

export const getBuyerOffers = createAsyncThunk<
  OffersTableItem[] | undefined,
  GetBuyerOffersProps
>('marketplace/getBuyerOffers', async (params, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { onSuccess, onFailure, collectionId } = params;

  const jellyInstance = await jellyJsInstanceHandler({
    thunkAPI,
    slice: marketplaceSlice,
  });

  try {
    let floorDifferencePrice: any;
    let currencyMarketPrice: any;
    const nonFungibleContractAddress =
      Principal.fromText(collectionId);

    const collection = await getJellyCollection({
      jellyInstance,
      collectionId,
    });

    if (!collection)
      throw Error(`Oops! collection ${collectionId} not found!`);

    const jellyCollection = await jellyInstance.getJellyCollection(
      collection,
    );

    const result = await jellyCollection.getAllNFTs({
      buyer: await getPrincipal(),
    });

    // Floor Difference calculation
    const floorDifferenceResponse = await actorInstance.getFloor(
      nonFungibleContractAddress,
    );

    if ('Ok' in floorDifferenceResponse) {
      floorDifferencePrice = floorDifferenceResponse.Ok.toString();
    }

    // Fetch ICP Price
    const icpPriceResponse = await getICPPrice();
    if (icpPriceResponse && icpPriceResponse.usd) {
      currencyMarketPrice = icpPriceResponse.usd;
    }

    const { data } = result;

    const offers = parseOffersMadeResponse({
      data,
      floorDifferencePrice,
      currencyMarketPrice,
    });

    if (typeof onSuccess === 'function') {
      onSuccess(offers);
    }

    return offers;
  } catch (err) {
    AppLog.error(err);
    thunkAPI.dispatch(
      notificationActions.setErrorMessage(
        'Oops! Failed to get buyer offers',
      ),
    );
    if (typeof onFailure === 'function') {
      onFailure(err);
    }
  }
});
