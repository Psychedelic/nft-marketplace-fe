import { useEffect } from 'react';
import {
  useAppDispatch,
  usePlugStore,
  marketplaceActions,
} from '../store';

export const useBuyerOffers = () => {
  const dispatch = useAppDispatch();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  useEffect(() => {
    if (!isConnected || !plugPrincipal) return;

    dispatch(
      marketplaceActions.getBuyerOffers({
        userPrincipalId: plugPrincipal,
        onSuccess: (offers) => {
          console.log(offers, 'offers');
        },
        onFailure: () => {
          // TODO: handle failure messages
        },
      }),
    );
  }, [dispatch, isConnected, plugPrincipal]);
};
