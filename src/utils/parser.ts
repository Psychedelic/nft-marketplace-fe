/* eslint-disable no-underscore-dangle */
import { Principal } from '@dfinity/principal';
import { Listing, Offer } from '../declarations/marketplace';
import {
  formatAddress,
  floorDiffPercentageCalculator,
  parseE8SAmountToWICP,
} from './formatters';
import { formatTimestamp } from '../integrations/functions/date';
import { OffersTableItem } from '../declarations/legacy';
import { OperationTypes } from '../components/core/table-cells/type-details-cell';

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
        const {
          price,
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
          currencyMarketPrice * Number(parseE8SAmountToWICP(price));

        const offerTableItem: OffersTableItem = {
          item: {
            // TODO: formatter for name, as number should probably have leading 0's
            // e.g. Cap Crowns #00001 ?!
            name: `CAP Crowns #${tokenId}`,
            tokenId,
          },
          price,
          floorDifference: floorDiffPercentageCalculator({
            currentPrice: parseE8SAmountToWICP(price),
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
    const {
      price,
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
      currencyMarketPrice * Number(parseE8SAmountToWICP(price));

    const offerTableItem: OffersTableItem = {
      item: {
        // TODO: formatter for name, as number should probably have leading 0's
        // e.g. Cap Crowns #00001 ?!
        name: `CAP Crowns #${tokenId}`,
        tokenId,
      },
      price,
      floorDifference: floorDiffPercentageCalculator({
        currentPrice: parseE8SAmountToWICP(price),
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

// TODO: This should not exist, so no need to move to utils or helpers
// only used temporarily to map the operation types to the types known in the UI
// the UI should use the service operation type names instead
export const getOperationType = (operation: OperationTypes) => {
  // TODO: Refactor, the table should use the source type names
  // see todo in /src/components/core/table-cells/type-details-cell.tsx
  switch (operation) {
    case 'directBuy':
      return 'sale';
    case 'makeListing':
      return 'list';
    default:
      return operation;
  }
};

// TODO: Should be reused, as table type is similar
// see comment in the nft-activity-table-tsx
type TablePrincipal = {
  raw: string,
  formatted: string,
}

export type TokenTransactionItem = {
  items: {
    name: string,
    logo?: string,
  },
  type: OperationTypes,
  price: BigInt,
  from: TablePrincipal,
  to: TablePrincipal,
  date: string,
};

export const parseTokenTransactions = ({
  items,
}: {
  items: any[],
}) => {
  const parsed = items.reduce((acc: any, curr: any) => {
    const parsedArr = Uint8Array.from(
      // eslint-disable-next-line no-underscore-dangle
      Object.values(curr.event.caller._arr),
    );
    const fromPrincipal = Principal.fromUint8Array(parsedArr);
    const to = {
      raw: fromPrincipal.toString(),
      formatted: formatAddress(
        Principal.fromUint8Array(parsedArr).toString()
      ),
    }

    acc = [
      ...acc,
      {
        item: {
          name: `CAP Crowns #${curr.event.details[0][1].U64}`,
        },
        type: getOperationType(curr.event.operation),
        price: parseE8SAmountToWICP(curr.event.details[2][1].U64),
        // TODO: the from/to needs a bit of thought as the type of operation
        // might not provide the data (for example on makeList)
        from: '',
        to,
        date: formatTimestamp(BigInt(curr.event.time)),
        floorDifference: '',
      }
    ];

    return acc;
  }, [] as TokenTransactionItem[]);

  return parsed;
};