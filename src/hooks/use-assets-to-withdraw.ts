import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';
import {
  useAppDispatch,
  RootState,
  usePlugStore,
  marketplaceActions,
} from '../store';

export const useAssetsToWithdraw = () => {
  const dispatch = useAppDispatch();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const match = useMatch('/:collectionId');
  const collectionId = match?.params?.collectionId;

  const recentlyFailedTransactions = useSelector(
    (state: RootState) =>
      state.marketplace.recentlyFailedTransactions,
  );

  const recentlyWithdrawnAssets = useSelector(
    (state: RootState) => state.marketplace.recentlyWithdrawnAssets,
  );

  useEffect(() => {
    if (!isConnected || !plugPrincipal || !collectionId) return;
    dispatch(
      marketplaceActions.getAssetsToWithdraw({
        collectionId,
      }),
    );
  }, [
    dispatch,
    isConnected,
    plugPrincipal,
    recentlyWithdrawnAssets,
    recentlyFailedTransactions,
    collectionId,
  ]);
};

