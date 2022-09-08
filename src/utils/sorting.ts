import { SortKey } from '@psychedelic/jelly-js';
import { OffersTableItem } from '../declarations/legacy';
import { ParsedTokenOffers, TokenTransactionItem } from './parser';

type TnxTimestamp = TokenTransactionItem | OffersTableItem;

export const sortTokenOffersByPrice = (offers: ParsedTokenOffers) => {
  return offers.sort((a, b) => {
    const offerAPrice = Number(a.price.toString());
    const offerBPrice = Number(b.price.toString());

    // sort type: Descending
    return offerBPrice - offerAPrice;
  });
};

export const sortTransactionsByTime = (
  transactions: TokenTransactionItem[] | OffersTableItem[],
) => {
  return transactions.sort((a: TnxTimestamp, b: TnxTimestamp) => {
    return Number(b.time.toString()) - Number(a.time.toString());
  });
};

export const sortActivitiesByTime = (activities: any) => {
  return activities.sort((a: any, b: any) => {
    return Number(b.time.toString()) - Number(a.time.toString());
  });
};

export const getSortValue = (key: string) => {
  switch (key) {
    case 'Recently Listed':
      return SortKey.lastListing;
    case 'Recently Offered':
      return SortKey.lastOffer;
    case 'Recently Sold':
      return SortKey.lastSale;
    case 'Highest Last Sale':
      return SortKey.listingPrice;
    case 'Lowest Last Sale':
      return SortKey.listingPrice;
    case 'Highest Last Offer':
      return SortKey.offerPrice;
    case 'Lowest Last Offer':
      return SortKey.offerPrice;
    case 'Price High to Low':
      return SortKey.salePrice;
    case 'Price Low to High':
      return SortKey.salePrice;
    default:
      return SortKey.all;
  }
};
