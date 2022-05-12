import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const recentNFTUpdatesCount = () => {
  const recentNFTActions = useSelector((state: RootState) => {
    const {
      recentlyListedForSale,
      recentlyCancelledItems,
      recentlyAcceptedOffers,
      recentlyCancelledOffers,
      recentlyMadeOffers,
    } = state.marketplace;

    return [
      ...recentlyListedForSale,
      ...recentlyCancelledItems,
      ...recentlyAcceptedOffers,
      ...recentlyCancelledOffers,
      ...recentlyMadeOffers,
    ];
  });

  return recentNFTActions.length;
};
