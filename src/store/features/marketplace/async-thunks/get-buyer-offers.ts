import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import {
  GetBuyerOffers,
  marketplaceSlice,
} from '../marketplace-slice';
import config from '../../../../config/env';
import { getICPPrice } from '../../../../integrations/marketplace/price.utils';
import { notificationActions } from '../../errors';
import { parseOffersMadeResponse } from '../../../../utils/parser';

export type GetBuyerOffersProps = DefaultCallbacks & GetBuyerOffers;

export const getBuyerOffers = createAsyncThunk<
  ReturnType<typeof parseOffersMadeResponse> | undefined,
  GetBuyerOffersProps
>('marketplace/getBuyerOffers', async (params, thunkAPI) => {
  // Checks if an actor instance exists already
  // otherwise creates a new instance
  const actorInstance = await actorInstanceHandler({
    thunkAPI,
    serviceName: 'marketplace',
    slice: marketplaceSlice,
  });

  const { userPrincipalId, onSuccess, onFailure } = params;

  try {
    let floorDifferencePrice;
    let currencyMarketPrice;
    const nonFungibleContractAddress = Principal.fromText(
      config.crownsCanisterId,
    );
    const userPrincipalAddress = Principal.fromText(userPrincipalId);
    const result = await actorInstance.getBuyerOffers(
      nonFungibleContractAddress,
      userPrincipalAddress,
    );

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

    const parsedTokenOffers = parseOffersMadeResponse({
      data: result,
      floorDifferencePrice,
      currencyMarketPrice,
    });

    if (typeof onSuccess !== 'function') return;

    onSuccess(parsedTokenOffers);
  } catch (err) {
    thunkAPI.dispatch(
      notificationActions.setErrorMessage((err as Error).message),
    );
    if (typeof onFailure !== 'function') return;
    onFailure();
  }
});
