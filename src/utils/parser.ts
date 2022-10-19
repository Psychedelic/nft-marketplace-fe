/* eslint-disable no-underscore-dangle */
import { Principal } from '@dfinity/principal';
import { NFTToken, Offer as NFTOffer } from '@psychedelic/jelly-js';
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
import { checkIfDirectContractEvent } from './nfts';

type AssetToWithdraw = {
  principalId: string;
  amount: string;
};

type AssetsToWithdraw = AssetToWithdraw[];

export const parseTokenId = (val: String) =>
  parseInt(val.replaceAll('_', ''), 10);

type TokenOffers = Array<[bigint, Array<NFTOffer>]>;

export type ParsedTokenOffers = OffersTableItem[];

interface ParseGetTokenOffersParams {
  data: TokenOffers;
  floorDifferencePrice?: string;
  currencyMarketPrice?: number;
}

interface ParseOffersMadeParams {
  data: Array<NFTToken>;
  floorDifferencePrice?: bigint;
  currencyMarketPrice?: number;
  collectionName?: string;
}

export const parseGetTokenOffersResponse = ({
  data,
  floorDifferencePrice,
  currencyMarketPrice,
}: ParseGetTokenOffersParams) => {
  const parsed = data.reduce((accParent, currParent) => {
    const tokenOffers = currParent[1] as NFTOffer[];
    const parsedTokenOffers = tokenOffers.reduce(
      (accChild, currChild) => {
        const {
          price,
          tokenId,
          buyer: paymentAddress,
          time,
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

        const offerTableItem: any = {
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
          time: time.toString(),
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
  collectionName,
}: ParseOffersMadeParams) => {
  const parsedOffersMade = data.map((item: any) => {
    const { offers } = item;
    const offerTableItem = offers.reduce(
      (
        acc: any,
        { price, tokenId, buyer: paymentAddress, time }: NFTOffer,
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
          currencyMarketPrice * Number(parseE8SAmountToWICP(price));

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

    return offerTableItem;
  });

  sortTransactionsByTime(parsedOffersMade);

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

export const parseTablePrincipal = (
  arr: Record<number, number>,
): Principal | undefined => {
  const parsedArr = Uint8Array.from(Object.values(arr));
  const pid = Principal.fromUint8Array(parsedArr);

  return pid;
};

export const parseTokenTransactions = ({
  items,
}: {
  items: any[];
}) => {
  const parsed = items.reduce((acc: any, curr: any) => {
    const details = Object.fromEntries(curr.event.details);
    let buyer;
    let seller;
    const operationType = getOperationType(curr.event.operation);
    const isDirectContractEvent =
      checkIfDirectContractEvent(operationType);

    // We're only interested in user relevant operation types
    // e.g. directBuy, makeListing, makeOffer, etc
    if (!operationType) return acc;

    const sellerPrincipalAs = isDirectContractEvent
      ? curr.event.caller._arr
      : details.seller?.Principal._arr;

    if (sellerPrincipalAs) {
      const sellerPrincipal = parseTablePrincipal(sellerPrincipalAs);
      if (sellerPrincipal) {
        seller = {
          raw: sellerPrincipal.toString(),
          formatted: formatAddress(sellerPrincipal.toString()),
        };
      }
    }

    const buyerPrincipalAs = isDirectContractEvent
      ? details.to?.Principal._arr
      : details.buyer?.Principal._arr;

    if (buyerPrincipalAs) {
      const principal = parseTablePrincipal(buyerPrincipalAs);
      if (principal) {
        buyer = {
          raw: principal.toString(),
          formatted: formatAddress(principal.toString()),
        };
      }
    }

    const tokenIdFieldAs =
      details?.token_identifier ?? details?.token_id;
    const parsedTokenId =
      tokenIdFieldAs?.U64 ?? parseTokenId(tokenIdFieldAs?.Text);

    acc.push({
      item: {
        name: `CAP Crowns #${parsedTokenId}`,
      },
      type: operationType,
      price:
        details?.price?.U64 &&
        parseE8SAmountToWICP(details.price.U64),
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

interface ParseNFTOffersParams {
  offers: Array<NFTOffer>;
  floorPrice?: bigint;
  currencyMarketPrice?: number;
}

export type ParsedNFTOffers = OffersTableItem[];

export const parseNFTOffers = ({
  offers,
  floorPrice,
  currencyMarketPrice,
}: ParseNFTOffersParams) => {
  const parsed = offers.reduce((accParent, currParent) => {
    const {
      price,
      tokenId,
      buyer: paymentAddress,
      time: created,
    } = currParent;

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
        tokenId: BigInt(tokenId),
      },
      price,
      floorDifference: floorPrice
        ? floorDiffPercentageCalculator({
            currentPrice: parseE8SAmountToWICP(price),
            floorDifferencePrice: parseE8SAmountToWICP(floorPrice),
          })
        : 'n/a',
      fromDetails,
      time: created.toString(),
      computedCurrencyPrice,
    };

    return [...accParent, offerTableItem];
  }, [] as ParsedNFTOffers);

  return parsed;
};
