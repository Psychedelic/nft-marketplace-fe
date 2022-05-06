import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import {
  GetUserReceivedOffer,
  marketplaceSlice,
} from '../marketplace-slice';
import config from '../../../../config/env';
import { getICPPrice } from '../../../../integrations/marketplace/price.utils';
import { parseGetTokenOffersResponse } from '../../../../utils/parser';
import { notificationActions } from '../../errors';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';

export type GetUserReceivedOfferProps = DefaultCallbacks &
  GetUserReceivedOffer;

export const getTokenOffers = createAsyncThunk<
  ReturnType<typeof parseGetTokenOffersResponse> | undefined,
  GetUserReceivedOfferProps
>(
  'marketplace/getTokenOffers',
  async (
    { ownerTokenIdentifiers, onSuccess, onFailure },
    thunkAPI,
  ) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'marketplace',
      slice: marketplaceSlice,
    });

    try {
      let floorDifferencePrice;
      let currencyMarketPrice;
      const nonFungibleContractAddress = Principal.fromText(
        config.crownsCanisterId,
      );
      const result = await actorInstance.getTokenOffers(
        nonFungibleContractAddress,
        ownerTokenIdentifiers,
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

      const parsedTokenOffers = parseGetTokenOffersResponse({
        data: result,
        floorDifferencePrice: parseE8SAmountToWICP(
          floorDifferencePrice,
        ),
        currencyMarketPrice,
      });

      if (!Array.isArray(result) || !result.length) return [];

      if (typeof onSuccess !== 'function') return;

      onSuccess(parsedTokenOffers);
      return parsedTokenOffers;
    } catch (err) {
      thunkAPI.dispatch(
        notificationActions.setErrorMessage((err as Error).message),
      );
      if (typeof onFailure !== 'function') return;
      onFailure();
    }
  },
);
