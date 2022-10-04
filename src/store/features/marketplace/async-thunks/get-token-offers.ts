import { Principal } from '@dfinity/principal';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { actorInstanceHandler } from '../../../../integrations/actor';
import {
  GetUserReceivedOffer,
  marketplaceActions,
  marketplaceSlice,
} from '../marketplace-slice';
import { getICPPrice } from '../../../../integrations/marketplace/price.utils';
import { parseGetTokenOffersResponse } from '../../../../utils/parser';
import { notificationActions } from '../../notifications';
import { AppLog } from '../../../../utils/log';
import { parseE8SAmountToWICP } from '../../../../utils/formatters';

export type GetUserReceivedOfferProps = {
  collectionId: string;
} & DefaultCallbacks &
  GetUserReceivedOffer;

// TODO: Is this still being used? Can be deleted?
export const getTokenOffers = createAsyncThunk<
  ReturnType<typeof parseGetTokenOffersResponse> | undefined,
  GetUserReceivedOfferProps
>(
  'marketplace/getTokenOffers',
  async (
    { collectionId, ownerTokenIdentifiers, onSuccess, onFailure },
    thunkAPI,
  ) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance
    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'marketplace',
      slice: marketplaceSlice,
    });

    thunkAPI.dispatch(marketplaceActions.setOffersLoaded(false));

    try {
      let floorDifferencePrice;
      let currencyMarketPrice;
      const nonFungibleContractAddress =
        Principal.fromText(collectionId);
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

      const parsedTokenOffers =
        !Array.isArray(result) || !result.length
          ? []
          : parseGetTokenOffersResponse({
              data: result,
              floorDifferencePrice: parseE8SAmountToWICP(
                floorDifferencePrice,
              ),
              currencyMarketPrice,
            });

      if (typeof onSuccess === 'function') {
        onSuccess(parsedTokenOffers);
      }

      thunkAPI.dispatch(marketplaceActions.setOffersLoaded(true));

      return parsedTokenOffers;
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
    }
  },
);
