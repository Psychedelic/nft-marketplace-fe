import { OffersTableItem } from '../declarations/legacy';
import { ParsedTokenOffers, TokenTransactionItem } from './parser';

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
  return transactions.sort((a: any, b: any) => {
    const transactionATimestamp = a.time;
    const transactionBTimestamp = b.time;

    // sort type: Ascending
    return transactionBTimestamp - transactionATimestamp;
  });
};
