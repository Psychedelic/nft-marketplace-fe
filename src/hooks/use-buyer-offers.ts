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
import config from '../config/env';

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
        collectionId: config.nftCollectionId,

        onSuccess: (offers) => {
          if (!offers.length) return;

          // calculate sumOfUserAllowance
          let sumOfUserAllowance = 0;
          offers.map((offer: OffersTableItem) => {
            sumOfUserAllowance =
              sumOfUserAllowance +
              Number(parseE8SAmountToWICP(offer.price));
          });

          // update sumOfUserAllowance value in store
          dispatch(
            marketplaceActions.setSumOfUserAllowance(
              sumOfUserAllowance,
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
