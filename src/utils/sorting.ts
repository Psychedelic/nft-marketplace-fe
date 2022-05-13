import { ParsedTokenOffers } from './parser';

export const sortTokenOffersByPrice = (offers: ParsedTokenOffers) => {
  return offers.sort((a, b) => {
    const offerAPrice = Number(a.price.toString());
    const offerBPrice = Number(b.price.toString());

    // sort type: Descending
    return offerBPrice - offerAPrice;
  });
};
