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
  checkIsConnected,
  getPrincipal,
  formatAddress,
} from '../../integrations/plug';
import {
  PLUG_WALLET_WEBSITE_URL,
  PLUG_STATUS_CODES,
} from '../../constants';
import { CANISTER_ID, NETWORK } from '../../config';

export const Plug = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line
  const { isConnected, connectionStatus, principalId } =
    usePlugStore();
  const dispatch = useAppDispatch();
  const hasPlug = isPlugInstalled();

  // eslint-disable-next-line
  const isVerifying = useMemo(() => {
    return connectionStatus === PLUG_STATUS_CODES.Verifying;
  }, [connectionStatus]);

  // eslint-disable-next-line
  const isConnecting = useMemo(() => {
    return connectionStatus === PLUG_STATUS_CODES.Connecting;
  }, [connectionStatus]);

  useEffect(() => {
    const verifyPlugConnection = async () => {
      if (!hasPlug) {
        // update connection status to not-installed
        dispatch(
          plugActions.setConnectionStatus(
            PLUG_STATUS_CODES.NotInstalled,
          ),
        );

        return;
      }

      const connected = await checkIsConnected();

      if (!connected) {
        // update connection status to installed
        dispatch(
          plugActions.setConnectionStatus(
            PLUG_STATUS_CODES.FailedToConnect,
          ),
        );

        return;
      }

      // update connection status to connected
      dispatch(plugActions.setIsConnected(connected));
    };

    verifyPlugConnection();
  }, [hasPlug, dispatch]);

  // update principal Id
  useEffect(() => {
    if (isConnected) {
      const getPrincipalId = async () => {
        const principal = await getPrincipal();

        if (principal) {
          if (typeof principal === 'string') {
            dispatch(
              plugActions.setPrincipalId(
                principal as unknown as string,
              ),
            );
          } else {
            dispatch(plugActions.setPrincipalId(principal.toText()));
          }
        }
      };

      getPrincipalId();
    }
  }, [isConnected, dispatch]);

  const handleConnectToPlug = async () => {
    // List of canisters to whitelist
    // this should be provided from the env conf file
    const marketplaceCanisterId = 'renrk-eyaaa-aaaaa-aaada-cai';
    const wICPCanisterId = 'qjdve-lqaaa-aaaaa-aaaeq-cai';
    const crownsCanisterId = 'rkp4c-7iaaa-aaaaa-aaaca-cai';

    try {
      // verifying plug connection
      dispatch(
        plugActions.setConnectionStatus(PLUG_STATUS_CODES.Connecting),
      );

      const whitelist = [
        crownsCanisterId,
        marketplaceCanisterId,
        wICPCanisterId,
      ];
      const host = NETWORK;

      // request app to connect with plug
      const connected = await requestConnectToPlug({
        whitelist,
        host,
      });

      if (!connected) {
        throw Error('Oops! Failed to connect to plug.');
      }

      // connected to plug
      dispatch(plugActions.setIsConnected(true));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      // failed to connect plug
      dispatch(plugActions.setIsConnected(false));
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
      {isConnecting && (
        <PlugButton
          handleClick={handleClick}
          text={t('translation:buttons.action.connecting')}
        />
      )}
      {!isVerifying && !isConnecting && !isConnected && (
        <PlugButton
          handleClick={handleClick}
          text={
            hasPlug
              ? t('translation:buttons.action.connectToPlug')
              : t('translation:buttons.action.installPlug')
          }
        />
      )}
      {!isVerifying && !isConnecting && isConnected && (
        <PlugButton
          handleClick={() => {
            // eslint-disable-next-line no-console
            console.log('Already connected to plug!');
          }}
          text={
            principalId
              ? formatAddress(principalId)
              : t('translation:buttons.action.loading')
          }
        />
      )}
    </>
  );
};
