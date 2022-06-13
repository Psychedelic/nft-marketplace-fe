import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useAppDispatch,
  RootState,
  usePlugStore,
  marketplaceActions,
} from '../store';

export const useAssetsToWithdraw = () => {
  const dispatch = useAppDispatch();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const recentlyFailedTransactions = useSelector(
    (state: RootState) =>
      state.marketplace.recentlyFailedTransactions,
  );

  const recentlyWithdrawnAssets = useSelector(
    (state: RootState) => state.marketplace.recentlyWithdrawnAssets,
  );

  useEffect(() => {
    if (!isConnected || !plugPrincipal) return;

    dispatch(
      marketplaceActions.getAssetsToWithdraw({
        userPrincipalId: plugPrincipal,
      }),
    );
  }, [
    dispatch,
    isConnected,
    plugPrincipal,
    recentlyWithdrawnAssets,
    recentlyFailedTransactions,
  ]);
};
