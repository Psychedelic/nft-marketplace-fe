import { Principal } from '@dfinity/principal';
import { Listing } from '../declarations/marketplace';

type GetAllListingsDataResponse = Array<[[Principal, bigint], Listing]>;
export type GetAllListingsDataParsed = {
  tokenId: BigInt;
  listing: Listing;
};

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
