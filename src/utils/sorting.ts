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
  return transactions.sort(
    (a: TnxTimestamp, b: TnxTimestamp) => {
      return Number(b.time.toString()) - Number(a.time.toString())
    }
  );
};
