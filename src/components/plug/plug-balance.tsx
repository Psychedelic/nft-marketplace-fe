import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  notificationActions,
  RootState,
  useAppDispatch,
} from '../../store';

import { PlugWICPBalance, WICPLogo } from './styles';
import { SpinnerIcon } from '../icons/custom';
import { AppLog } from '../../utils/log';
import wicpImage from '../../assets/wicp.svg';
import { roundOffDecimalValue } from '../../utils/nfts';
import { getPlugWalletBalance } from '../../integrations/plug';

export type PlugBalanceProps = {
  isConnected: boolean;
};

const PlugBalance = ({ isConnected }: PlugBalanceProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [plugWicpBalance, setPlugWicpBalance] = useState('');
  const [plugLoadingWicpBalance, setPlugLoadingWicpBalance] =
    useState(false);

  const recentlyPurchasedTokens = useSelector(
    (state: RootState) => state.marketplace.recentlyPurchasedTokens,
  );

  const recentlyMadeOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyMadeOffers,
  );

  useEffect(() => {
    if (!isConnected) return;

    (async () => {
      setPlugLoadingWicpBalance(true);
      try {
        const allPlugBalance = await getPlugWalletBalance();

        const wicpWalletBalance = allPlugBalance?.find(
          (balance: any) => balance?.name === 'Wrapped ICP',
        );

        setPlugWicpBalance(wicpWalletBalance?.amount);
        setPlugLoadingWicpBalance(false);
      } catch (err) {
        setPlugLoadingWicpBalance(false);
        AppLog.error(err);
        dispatch(
          notificationActions.setErrorMessage(
            t('translation:errorMessages.unableToGetBalance'),
          ),
        );
      }
    })();
  }, [isConnected, recentlyPurchasedTokens, recentlyMadeOffers]);

  return (
    <>
      {isConnected && (
        <PlugWICPBalance>
          <WICPLogo
            src={wicpImage}
            alt={t('translation:logoAlts.wicp')}
          />
          {plugWicpBalance !== '' && !plugLoadingWicpBalance ? (
            `${roundOffDecimalValue(Number(plugWicpBalance), 2)}`
          ) : (
            <SpinnerIcon />
          )}
          WICP
        </PlugWICPBalance>
      )}
    </>
  );
};

export default PlugBalance;
