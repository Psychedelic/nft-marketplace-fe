import { createAsyncThunk } from '@reduxjs/toolkit';
import { Principal } from '@dfinity/principal';
import { NFTToken, Offer } from '@psychedelic/jelly-js';
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
import { getICPPrice } from '../../../../integrations/marketplace/price.utils';

export type GetUserNFTsProps = NSKyasshuUrl.GetNFTsQueryParams & {
  payload?: any;
  abortController?: AbortController;
};

export const getUserOffers = createAsyncThunk<any | undefined, any>(
  'marketplace/getUserOffers',
  async (
    { collectionId, onSuccess, onFailure, collectionName },
    thunkAPI,
  ) => {
    thunkAPI.dispatch(marketplaceActions.setOffersLoaded(false));

    const jellyInstance = await jellyJsInstanceHandler({
      thunkAPI,
      slice: marketplaceSlice,
    });

    try {
      let floorDifferencePrice: any;
      let currencyMarketPrice: number;
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

      const res: any = await jellyCollection.getUserNFTs({
        owner: await getPrincipal(),
      });

      const { data } = res;

      // Fetch ICP Price
      const icpPriceResponse = await getICPPrice();
      if (icpPriceResponse && icpPriceResponse.usd) {
        currencyMarketPrice = icpPriceResponse.usd;
      }

      // Floor Difference calculation
      const floorDifferenceResponse =
        await jellyCollection.getFloorPrice();

      if (floorDifferenceResponse?.ok) {
        floorDifferencePrice = floorDifferenceResponse?.data;
      }

      let offersFetched = [];

      if (data && data.length > 0) {
        offersFetched = data.filter(
          (nftData: NFTToken) =>
            nftData.offers && nftData.offers.length > 0,
        );
      }

      const offers = offersFetched?.map((item: NFTToken) => {
        const metadata = item?.offers.reduce(
          (
            acc: any,
            { price, tokenId, buyer: paymentAddress, time }: Offer,
          ) => {
            const fromDetails = {
              // eslint-disable-next-line no-underscore-dangle
              formattedAddress: paymentAddress._isPrincipal
                ? formatAddress(paymentAddress.toString())
                : 'n/a',
              // eslint-disable-next-line no-underscore-dangle
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
                name: `${collectionName} #${tokenId}`,
                tokenId,
                logo: item.thumbnail,
              },
              price,
              floorDifference: floorDifferencePrice
                ? floorDiffPercentageCalculator({
                    currentPrice: parseE8SAmountToWICP(price),
                    floorDifferencePrice: parseE8SAmountToWICP(
                      floorDifferencePrice,
                    ),
                  })
                : 'n/a',
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
