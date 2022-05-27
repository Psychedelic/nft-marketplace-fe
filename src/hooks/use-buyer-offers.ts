import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useAppDispatch,
  RootState,
  usePlugStore,
  marketplaceActions,
} from '../store';
import { OffersTableItem } from '../declarations/legacy';
import { parseE8SAmountToWICP } from '../utils/formatters';

export const useBuyerOffers = () => {
  const dispatch = useAppDispatch();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const recentlyMadeOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyMadeOffers,
  );

  const recentlyPurchasedTokens = useSelector(
    (state: RootState) => state.marketplace.recentlyPurchasedTokens,
  );

  useEffect(() => {
    if (!isConnected || !plugPrincipal) return;

    dispatch(
      marketplaceActions.getBuyerOffers({
        userPrincipalId: plugPrincipal,
        onSuccess: (offers) => {
          if (!offers.length) return;

          // calculate utilizedAllowance
          let utilizedAllowance = 0;
          offers.map((offer: OffersTableItem) => {
            utilizedAllowance =
              utilizedAllowance +
              Number(parseE8SAmountToWICP(offer.price));
          });

          // update utilizedAllowance value in store
          dispatch(
            marketplaceActions.setUtilizedAllowance(
              utilizedAllowance,
            ),
          );
        },
        onFailure: () => {
          // TODO: handle failure messages
        },
      }),
    );
  }, [
    dispatch,
    isConnected,
    plugPrincipal,
    recentlyMadeOffers,
    recentlyPurchasedTokens,
  ]);
};
