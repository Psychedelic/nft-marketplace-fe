import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Principal } from '@dfinity/principal';
import {
  notificationActions,
  plugActions,
  RootState,
  useAppDispatch,
  usePlugStore,
} from '../../store';

import { PlugWICPBalance, WICPLogo, WICPText } from './styles';
import { SpinnerIcon } from '../icons/custom';
import { AppLog } from '../../utils/log';
import wicpImage from '../../assets/wicp.svg';
import { roundOffDecimalValue } from '../../utils/nfts';
import { getDIP20BalanceOf } from '../../utils/dip20';
import { BalanceTooltip } from '../core/tooltip';

const PlugBalance = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    wicpBalance,
    loadingWicpBalance,
    principalId: plugPrincipal,
  } = usePlugStore();

  const recentlyPurchasedTokens = useSelector(
    (state: RootState) => state.marketplace.recentlyPurchasedTokens,
  );

  const recentlyMadeOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyMadeOffers,
  );

  useEffect(() => {
    (async () => {
      try {
        if (!plugPrincipal) return;

        const balance = await getDIP20BalanceOf({
          userPrincipal: Principal.fromText(plugPrincipal),
        });

        if (!balance) {
          dispatch(plugActions.setWICPBalance('0.0'));

          return;
        }

        dispatch(plugActions.setWICPBalance(balance));
      } catch (err) {
        AppLog.error(err);
        dispatch(
          notificationActions.setErrorMessage(
            t('translation:errorMessages.unableToGetBalance'),
          ),
        );
      }
    })();
  }, [recentlyPurchasedTokens, recentlyMadeOffers, plugPrincipal]);

  return (
    <PlugWICPBalance>
      <WICPLogo
        src={wicpImage}
        alt={t('translation:logoAlts.wicp')}
      />
      {wicpBalance !== '' && !loadingWicpBalance ? (
        <BalanceTooltip text={wicpBalance} />
      ) : (
        <SpinnerIcon />
      )}
      <WICPText>WICP</WICPText>
    </PlugWICPBalance>
  );
};

export default PlugBalance;
