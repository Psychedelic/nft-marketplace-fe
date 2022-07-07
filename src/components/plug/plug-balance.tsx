import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  notificationActions,
  RootState,
  plugActions,
  useAppDispatch,
  usePlugStore,
} from '../../store';

import { PlugWICPBalance, WICPLogo, WICPText } from './styles';
import { SpinnerIcon } from '../icons/custom';
import { AppLog } from '../../utils/log';
import wicpImage from '../../assets/wicp.svg';
import { roundOffDecimalValue } from '../../utils/nfts';
import { getPlugWalletBalance } from '../../integrations/plug';

const PlugBalance = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loadingWICPBalance } = usePlugStore();
  const [plugWicpBalance, setPlugWicpBalance] = useState('');

  const recentlyPurchasedTokens = useSelector(
    (state: RootState) => state.marketplace.recentlyPurchasedTokens,
  );

  const recentlyMadeOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyMadeOffers,
  );

  useEffect(() => {
    (async () => {
      dispatch(plugActions.setLoadingWICPBalance(true));
      try {
        const allPlugBalance = await getPlugWalletBalance();

        const wicpWalletBalance = allPlugBalance?.find(
          (balance: any) => balance?.name === 'Wrapped ICP',
        );

        setPlugWicpBalance(wicpWalletBalance?.amount);
        dispatch(plugActions.setLoadingWICPBalance(false));
        dispatch(
          plugActions.setWalletsWICPBalance(
            wicpWalletBalance?.amount,
          ),
        );
      } catch (err) {
        dispatch(plugActions.setLoadingWICPBalance(false));
        AppLog.error(err);
        dispatch(
          notificationActions.setErrorMessage(
            t('translation:errorMessages.unableToGetBalance'),
          ),
        );
      }
    })();
  }, [recentlyPurchasedTokens, recentlyMadeOffers]);

  return (
    <PlugWICPBalance>
      <WICPLogo
        src={wicpImage}
        alt={t('translation:logoAlts.wicp')}
      />
      {plugWicpBalance !== '' && !loadingWICPBalance ? (
        `${roundOffDecimalValue(Number(plugWicpBalance), 2)}`
      ) : (
        <SpinnerIcon />
      )}
      <WICPText>WICP</WICPText>
    </PlugWICPBalance>
  );
};

export default PlugBalance;
