import { Principal } from '@dfinity/principal';
import { Listing, Offer } from '../declarations/marketplace';

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
  from: string,
  time: bigint,
}

type TokenOffers = Array<[bigint, Array<Offer>]>;

type ParsedTokenOffers = OffersTableItem[];

export const parseGetTokenOffersresponse = (data: TokenOffers) => {
  const parsed = data.reduce((accParent, currParent) => {
    const tokenOffers = currParent[1] as Offer[];
    const parsedTokenOffers = tokenOffers.reduce((accChild, currChild) => {
      const {
        price,
        token_id: tokenId,
        payment_address: paymentAddress,
        created,
      } = currChild;

      const offerTableItem: OffersTableItem = {
        item: {
          // TODO: formatter for name, as number should probably have leading 0's
          // e.g. Cap Crowns #00001 ?!
          name: `CAP Crowns #${tokenId}`,
          tokenId,
        },
        price,
        // TODO: use the floor difference endpoint
        floorDifference: 'n/a',
        from: paymentAddress.toString(),
        // TODO: use DayJs and have this computed to human friendly
        time: created,
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
