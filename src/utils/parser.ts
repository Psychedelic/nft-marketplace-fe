import { Principal } from '@dfinity/principal';
import { Listing } from '../declarations/marketplace';

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
  console.log(data, 'listing data')
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

export const parseGetTokenOffersresponse = (data: any) => {
  // TODO: Update parser details
  const parsed: any = data.reduce((acc, curr) => {
    const offers = curr[1].map((offer: any) => {
      const data = {
        item: {
          name: `CAP Crowns #${offer.token_id}`,
          token_id: Number(offer.token_id).toString(),
        },
        price: Number(offer.price).toString(),
        floorDifference: '-',
        from: Principal.fromUint8Array(offer.payment_address).toText(),
        time: '-'
      };

      return data;
    });

    acc = offers;

    return acc;
  }, [] as any);

  return parsed;
};
