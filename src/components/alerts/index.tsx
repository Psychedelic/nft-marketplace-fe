import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  AlertsContainer,
  AlertsWrapper,
  MessageContainer,
  Message,
} from './styles';
import { Icon } from '../icons';
import { WithdrawAssetsModal } from '../modals';
import {
  useAppDispatch,
  usePlugStore,
  marketplaceActions,
  RootState,
} from '../../store';

/* --------------------------------------------------------------------------
 * Alerts Component
 * --------------------------------------------------------------------------*/

export const Alerts = () => {
  const dispatch = useAppDispatch();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();
  const { t } = useTranslation();

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

  return (
    <AlertsContainer>
      <AlertsWrapper>
        <MessageContainer>
          <Icon icon="warningOutline" />
          <Message>
            {t('translation:alerts.transactionsMessage')}
          </Message>
          <WithdrawAssetsModal />
        </MessageContainer>
      </AlertsWrapper>
    </AlertsContainer>
  );
};
