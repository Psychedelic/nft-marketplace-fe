import { Principal } from '@dfinity/principal';
import { Listing, Offer } from '../declarations/marketplace';
import { formatAddress } from './formatters';
import { formatTimestamp } from '../integrations/functions/date';

type GetAllListingsDataResponse = Array<[[Principal, bigint], Listing]>;

export type GetAllListingsDataParsed = {
  tokenId: BigInt;
  listing: Listing;
};

export type GetAllListingsDataParsedObj = Record<number, Listing>;

export const parseAllListingResponse = (data: GetAllListingsDataResponse) => {
  const parsed: GetAllListingsDataParsed[] = data.reduce((acc, curr) => {
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
  }, [] as GetAllListingsDataParsed[]);

  return parsed;
};

export const parseAllListingResponseAsObj = (data: GetAllListingsDataResponse) => {
  console.log(data, 'listing data');
  const parsed: GetAllListingsDataParsedObj = data.reduce((acc, curr) => {
    const tokenId = String(curr[0][1]);
    const listing = curr[1];

    acc = {
      ...acc,
      [tokenId]: listing,
    };

    return acc;
    /* eslint-disable */
  }, {} as GetAllListingsDataParsedObj);

  return parsed;
};

interface OffersTableItem {
  item: {
    name: string,
    tokenId: bigint,
  },
  price: bigint,
  floorDifference: string,
  fromDetails: {
    formattedAddress: string,
    address: string,
  }
  time: string,
  computedCurrencyPrice: number | undefined,
}

type TokenOffers = Array<[bigint, Array<Offer>]>;

type ParsedTokenOffers = OffersTableItem[];

export const parseGetTokenOffersresponse = (
  data: TokenOffers,
  floorDifference: string,
  currencyMarketPrice: number | undefined,
) => {
  const parsed = data.reduce((accParent, currParent) => {
    const tokenOffers = currParent[1] as Offer[];
    const parsedTokenOffers = tokenOffers.reduce((accChild, currChild) => {
      const {
        price,
        token_id: tokenId,
        payment_address: paymentAddress,
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
      }

      let computedCurrencyPrice;
      if (currencyMarketPrice) {
        computedCurrencyPrice = currencyMarketPrice * Number(price.toString())
      }
      const offerTableItem: OffersTableItem = {
        item: {
          // TODO: formatter for name, as number should probably have leading 0's
          // e.g. Cap Crowns #00001 ?!
          name: `CAP Crowns #${tokenId}`,
          tokenId,
        },
        price,
        // TODO: use the floor difference endpoint
        floorDifference,
        fromDetails,
        time: formatTimestamp(created),
        computedCurrencyPrice,
      };
  
      return [
        ...accChild,
        offerTableItem,
      ];
    }, [] as ParsedTokenOffers);

    return [
      ...accParent,
      ...parsedTokenOffers,
    ];
  }, [] as ParsedTokenOffers);

  return parsed;
};
