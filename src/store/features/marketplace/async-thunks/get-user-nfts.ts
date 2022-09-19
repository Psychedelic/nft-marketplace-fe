import { createAsyncThunk } from '@reduxjs/toolkit';
import { jellyJsInstanceHandler } from '../../../../integrations/jelly-js';
import {
  marketplaceActions,
  marketplaceSlice,
} from '../marketplace-slice';
import { NSKyasshuUrl } from '../../../../integrations/kyasshu';
import { getJellyCollection } from '../../../../utils/jelly';
import { AppLog } from '../../../../utils/log';
import { getPrincipal } from '../../../../integrations/plug';
import { notificationActions } from '../../notifications';
import {
  floorDiffPercentageCalculator,
  formatAddress,
  parseE8SAmountToWICP,
} from '../../../../utils/formatters';
import { actorInstanceHandler } from '../../../../integrations/actor';
import { Principal } from '@dfinity/principal';
import config from '../../../../config/env';
import { getICPPrice } from '../../../../integrations/marketplace/price.utils';
import { Offer } from '../../../../declarations/marketplace-v2';

export type GetUserNFTsProps = NSKyasshuUrl.GetNFTsQueryParams & {
  payload?: any;
  abortController?: AbortController;
};

export const getUserNFTs = createAsyncThunk<any | undefined, any>(
  'marketplace/getUserNFTs',
  async ({ collectionId, onSuccess, onFailure }, thunkAPI) => {
    // Checks if an actor instance exists already
    // otherwise creates a new instance

    const actorInstance = await actorInstanceHandler({
      thunkAPI,
      serviceName: 'marketplace',
      slice: marketplaceSlice,
    });

    thunkAPI.dispatch(marketplaceActions.setOffersLoaded(false));

    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      collectionId,
      slice: marketplaceSlice,
    });

    try {
      let floorDifferencePrice: string;
      let currencyMarketPrice: number;
      const nonFungibleContractAddress = Principal.fromText(
        config.nftCollectionId,
      );
      const collection = await getJellyCollection({
        jellyInstance,
        collectionId,
      });

      if (!collection)
        throw Error(`Oops! collection ${collectionId} not found!`);

      const jellyCollection = await jellyInstance.getJellyCollection(
        collection,
      );

      const res = await jellyCollection.getUserNFTs({
        owner: await getPrincipal(),
      });

      const { data } = res;

      // Floor Difference calculation
      const floorDifferenceResponse = await actorInstance.getFloor(
        nonFungibleContractAddress,
      );

      if ('Ok' in floorDifferenceResponse) {
        floorDifferencePrice = floorDifferenceResponse.Ok.toString();
      }

      const offers = data.map((item: any) => {
        const metadata = item.offers.reduce(
          (
            acc: any,
            {
              price,
              tokenId: tokenId,
              buyer: paymentAddress,
              time,
            }: Offer,
          ) => {
            const fromDetails = {
              formattedAddress: paymentAddress._isPrincipal
                ? formatAddress(paymentAddress.toString())
                : 'n/a',
              address: paymentAddress._isPrincipal
                ? paymentAddress.toString()
                : 'n/a',
            };

            const computedCurrencyPrice =
              currencyMarketPrice &&
              currencyMarketPrice *
                Number(parseE8SAmountToWICP(price));

            return {
              ...acc,
              item: {
                name: `CAP Crowns #${tokenId}`,
                tokenId,
                logo: item.thumbnail,
              },
              price,
              floorDifference: floorDiffPercentageCalculator({
                currentPrice: parseE8SAmountToWICP(price),
                floorDifferencePrice,
              }),
              fromDetails,
              time: time?.toString(),
              computedCurrencyPrice,
            };
          },
          {},
        );

        return metadata;
      });

      if (typeof onSuccess === 'function') {
        onSuccess(offers);
      }

      thunkAPI.dispatch(marketplaceActions.setOffersLoaded(true));

      return offers;
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
