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
import {
  sortTokenOffersByPrice,
  sortTransactionsByTime,
} from './sorting';
import { OperationTypes, OperationType } from '../constants';

type GetAllListingsDataResponse = Array<
  [[Principal, bigint], Listing]
>;

type AssetToWithdraw = {
  principalId: string;
  amount: string;
};

type AssetsToWithdraw = AssetToWithdraw[];

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

export type ParsedTokenOffers = OffersTableItem[];

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

    const sortedOffersByPrice =
      sortTokenOffersByPrice(parsedTokenOffers);

    return [...accParent, ...sortedOffersByPrice];
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

// TODO: Have a "unknown" type for cases where operation mapping fails
export const getOperationType = (operationType: OperationType) =>
  OperationTypes[operationType];

// TODO: Should be reused, as table type is similar
// see comment in the nft-activity-table-tsx
type TablePrincipal = {
  raw: string;
  formatted: string;
};

export type TokenTransactionItem = {
  items: {
    name: string;
    logo?: string;
  };
  type: OperationTypes;
  price: BigInt;
  seller: TablePrincipal;
  buyer: TablePrincipal;
  date: string;
  time: number;
};

const tablePrincipalHandler = (principal: TablePrincipal) =>
  principal.raw !== 'aaaaa-aa' && principal;

export const parseTokenTransactions = ({
  items,
}: {
  items: any[];
}) => {
  const parsed = items.reduce((acc: any, curr: any) => {
    const details = Object.fromEntries(curr.event.details);
    var buyer, seller;

    if (details.seller) {
      const sellerPrincipal = parseTablePrincipal(details.seller?.Principal._arr);
      if (sellerPrincipal) {
        seller = {
          raw: sellerPrincipal.toString(),
          formatted: formatAddress(sellerPrincipal.toString()),
        };
      }
    }

    if (details.buyer) {
      const buyerPrincipal = parseTablePrincipal(details.buyer?.Principal._arr);
      if (buyerPrincipal) {
        buyer = {
          raw: buyerPrincipal.toString(),
          formatted: formatAddress(buyerPrincipal.toString()),
        };
      }
    }

    acc.push({
      item: {
        name: `CAP Crowns #${details.token_id.U64}`,
      },
      type: getOperationType(curr.event.operation),
      price: parseE8SAmountToWICP(details.price.U64),
      seller: seller ? tablePrincipalHandler(seller) : {},
      buyer: buyer ? tablePrincipalHandler(buyer) : {},
      date: formatTimestamp(BigInt(curr.event.time)),
      time: curr.event.time,
      floorDifference: '',
    });

    const sortedTransactionsByTime = sortTransactionsByTime(acc);

    return sortedTransactionsByTime;
  }, [] as TokenTransactionItem[]);

  return parsed;
};

export const parseTablePrincipal = (
  arr: Record<number, number>,
): Principal | undefined => {
  const parsedArr = Uint8Array.from(Object.values(arr));
  const pid = Principal.fromUint8Array(parsedArr);

  return pid;
};

// TODO: update data type while using collection details
export const parseGetCollectionsResponse = (data: Array<any>) => {
  const parsed = data.reduce((accParent, currParent) => {
    const collection: any = {
      collectionName: currParent[1]?.collection_name,
      fungibleVolume: parseE8SAmountToWICP(
        currParent[1]?.fungible_volume,
      ),
    };

    return [...accParent, collection];
  }, [] as Array<any>);

  return parsed;
};

// TODO: update data type while using collection details
export const parseBalanceResponse = (data: Array<any>) => {
  const parsed = data.reduce((accParent, currParent) => {
    const assetsToWithdraw: AssetToWithdraw = {
      principalId: Principal.fromUint8Array(
        currParent[0]._arr,
      ).toString(),
      amount: parseE8SAmountToWICP(currParent[1]),
    };

    return [...accParent, assetsToWithdraw];
  }, [] as AssetsToWithdraw);

  return parsed;
};
