import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PlugButton } from '../core';
import {
  usePlugStore,
  plugActions,
  useAppDispatch,
} from '../../store';
import {
  isPlugInstalled,
  requestConnectToPlug,
} from '../../integrations/plug';
import {
  PLUG_WALLET_WEBSITE_URL,
  PLUG_STATUS_CODES,
} from '../../constants';
import { CANISTER_ID, NETWORK } from '../../config';

export const Plug = () => {
  const { t } = useTranslation();
  const { isConnected, connectionStatus } = usePlugStore();
  const dispatch = useAppDispatch();
  const hasPlug = isPlugInstalled();

  // eslint-disable-next-line
  const isVerifying = useMemo(() => {
    return connectionStatus === PLUG_STATUS_CODES.Verifying;
  }, [connectionStatus]);

  useEffect(() => {
    if (!hasPlug) {
      // update connection status to not-installed
      dispatch(
        plugActions.setConnectionStatus(
          PLUG_STATUS_CODES.NotInstalled,
        ),
      );
    } else {
      // update connection status to installed
      dispatch(
        plugActions.setConnectionStatus(PLUG_STATUS_CODES.Installed),
      );
    }
  }, [hasPlug, dispatch]);

  const handleConnect = (connected: boolean) => {
    dispatch(plugActions.setIsConnected(connected));
  };

  const handleConnectToPlug = async () => {
    try {
      // verifying plug connection
      dispatch(
        plugActions.setConnectionStatus(PLUG_STATUS_CODES.Verifying),
      );

      const whitelist = [CANISTER_ID];
      const host = NETWORK;

      // request app to connect with plug
      const connected = await requestConnectToPlug({
        whitelist,
        host,
      });

      // connected to plug
      handleConnect(connected);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      // app failed to connect with plug
      dispatch(
        plugActions.setConnectionStatus(
          PLUG_STATUS_CODES.FailedToConnect,
        ),
      );
    }
  };

  const handleClick = () => {
    // Is plug installed
    if (!hasPlug) {
      // Ask user to install plug
      window.open(PLUG_WALLET_WEBSITE_URL, '_blank');
      return;
    }

    // connect to plug if installed
    handleConnectToPlug();
  };

  return (
    <>
      {isVerifying && (
        <PlugButton
          handleClick={handleClick}
          text={t('translation:buttons.action.loading')}
        />
      )}
      {!isVerifying && !isConnected && (
        <PlugButton
          handleClick={handleClick}
          text={
            hasPlug
              ? t('translation:buttons.action.connectToPlug')
              : t('translation:buttons.action.installPlug')
          }
        />
      )}
      {!isVerifying && isConnected && (
        <PlugButton handleClick={handleClick} text="Connected" />
      )}
    </>
  );
};
