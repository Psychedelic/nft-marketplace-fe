/* eslint-disable no-underscore-dangle */
import { Principal } from '@dfinity/principal';
import { Listing, Offer } from '../declarations/marketplace';
import {
  formatAddress,
  floorDiffPercentageCalculator,
} from './formatters';
import { formatTimestamp } from '../integrations/functions/date';
import { OffersTableItem } from '../declarations/legacy';
import { parseE8SAmountToWICP } from '../utils/formatters';

type GetAllListingsDataResponse = Array<
  [[Principal, bigint], Listing]
>;

export type GetAllListingsDataParsed = {
  tokenId: BigInt;
  listing: Listing;
};

export type GetAllListingsDataParsedObj = Record<number, Listing>;

export const parseAllListingResponse = (
  data: GetAllListingsDataResponse,
) => {
  const parsed: GetAllListingsDataParsed[] = data.reduce(
    (acc, curr) => {
      const tokenId = curr[0][1];
      const listing = curr[1];

      acc = [
        ...acc,
        {
          tokenId,
          listing,
        },
      ];

      return acc;
    },
    [] as GetAllListingsDataParsed[],
  );

  return parsed;
};

export const parseAllListingResponseAsObj = (
  data: GetAllListingsDataResponse,
) => {
  console.log(data, 'listing data');
  const parsed: GetAllListingsDataParsedObj = data.reduce(
    (acc, curr) => {
      const tokenId = String(curr[0][1]);
      const listing = curr[1];

      acc = {
        ...acc,
        [tokenId]: listing,
      };

      return acc;
    },
    {} as GetAllListingsDataParsedObj,
  );

  return parsed;
};

type TokenOffers = Array<[bigint, Array<Offer>]>;

type ParsedTokenOffers = OffersTableItem[];

interface ParseGetTokenOffersParams {
  data: TokenOffers;
  floorDifferencePrice?: string;
  currencyMarketPrice?: number;
}

interface ParseOffersMadeParams {
  data: Array<Offer>;
  floorDifferencePrice?: string;
  currencyMarketPrice?: number;
}

export const parseGetTokenOffersResponse = ({
  data,
  floorDifferencePrice,
  currencyMarketPrice,
}: ParseGetTokenOffersParams) => {
  const parsed = data.reduce((accParent, currParent) => {
    const tokenOffers = currParent[1] as Offer[];
    const parsedTokenOffers = tokenOffers.reduce(
      (accChild, currChild) => {
        const price = parseE8SAmountToWICP(currChild?.price);
        const {
          token_id: tokenId,
          buyer: paymentAddress,
          created,
        } = currChild;

        // TODO: What to do if payment address not valid principal?
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
          currencyMarketPrice * Number(price.toString());

        const offerTableItem: OffersTableItem = {
          item: {
            // TODO: formatter for name, as number should probably have leading 0's
            // e.g. Cap Crowns #00001 ?!
            name: `CAP Crowns #${tokenId}`,
            tokenId,
          },
          price,
          floorDifference: floorDiffPercentageCalculator({
            currentPrice: price,
            floorDifferencePrice,
          }),
          fromDetails,
          time: formatTimestamp(created),
          computedCurrencyPrice,
        };

        return [...accChild, offerTableItem];
      },
      [] as ParsedTokenOffers,
    );

    return [...accParent, ...parsedTokenOffers];
  }, [] as ParsedTokenOffers);

  return parsed;
};

export const parseOffersMadeResponse = ({
  data,
  floorDifferencePrice,
  currencyMarketPrice,
}: ParseOffersMadeParams) => {
  const parsedOffersMade = data.map((offerDetails) => {
    const price = parseE8SAmountToWICP(offerDetails?.price);
    const {
      token_id: tokenId,
      buyer: paymentAddress,
      created,
    } = offerDetails;

    // TODO: What to do if payment address not valid principal?
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
      currencyMarketPrice * Number(price.toString());

    const offerTableItem: OffersTableItem = {
      item: {
        // TODO: formatter for name, as number should probably have leading 0's
        // e.g. Cap Crowns #00001 ?!
        name: `CAP Crowns #${tokenId}`,
        tokenId,
      },
      price,
      floorDifference: floorDiffPercentageCalculator({
        currentPrice: price,
        floorDifferencePrice,
      }),
      fromDetails,
      time: formatTimestamp(created),
      computedCurrencyPrice,
    };

    return offerTableItem;
  });

  return parsedOffersMade;
};
