import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PlugButton } from './plug-button';
import {
  usePlugStore,
  plugActions,
  useAppDispatch,
  RootState,
  nftsActions,
} from '../../store';
import {
  isPlugInstalled,
  hasPlugAgent,
  createPlugAgent,
  checkIsConnected,
  getPrincipal,
  getICNSInfo,
} from '../../integrations/plug';
import {
  getPlugButtonText,
  handleConnect,
} from '../../integrations/plug/plug.utils';
import { PlugStatusCodes } from '../../constants';
import config from '../../config/env';
import { AppLog } from '../../utils/log';
import useMediaQuery from '../../hooks/use-media-query';

const { wICPCanisterId, host } = config;

const whitelist = [wICPCanisterId];

export const Plug = () => {
  const { t } = useTranslation();
  const { isConnected, connectionStatus, principalId, icnsName } =
    usePlugStore();
  const dispatch = useAppDispatch();
  const hasPlug = isPlugInstalled();
  const isMobileScreen = useMediaQuery('(max-width: 850px)');

  const isVerifying = useMemo(
    () => connectionStatus === PlugStatusCodes.Verifying,
    [connectionStatus],
  );

  const isConnecting = useMemo(
    () => connectionStatus === PlugStatusCodes.Connecting,
    [connectionStatus],
  );

  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );

  useEffect(() => {
    const verifyPlugConnection = async () => {
      if (!hasPlug) {
        // update connection status to not-installed
        dispatch(
          plugActions.setConnectionStatus(
            PlugStatusCodes.NotInstalled,
          ),
        );

        return;
      }

      const connected = await checkIsConnected();

      if (!connected) {
        // update connection status to installed
        dispatch(
          plugActions.setConnectionStatus(
            PlugStatusCodes.FailedToConnect,
          ),
        );

        return;
      }

      if (!hasPlugAgent()) {
        await createPlugAgent({
          whitelist,
          host,
        });
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
        const icnsInfo = await getICNSInfo();

        if (icnsInfo?.reverseResolvedName) {
          dispatch(
            plugActions.setICNSName(icnsInfo?.reverseResolvedName),
          );
        }

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

  // Get user owned tokenIds
  // on connection successful and
  // on collectionId change
  useEffect(() => {
    if (!isConnected || !collectionDetails.collectionId) return;

    const { collectionId } = collectionDetails;

    dispatch(nftsActions.getMyNFTs({ collectionId }));
  }, [isConnected, collectionDetails, dispatch]);

  return (
    <>
      {isVerifying && (
        <PlugButton
          handleConnect={handleConnect}
          isMobileScreen={isMobileScreen}
          text={t('translation:buttons.action.loading')}
          isConnected={isConnected}
          principalId={principalId}
        />
      )}
      {isConnecting && (
        <PlugButton
          handleConnect={handleConnect}
          isMobileScreen={isMobileScreen}
          text={t('translation:buttons.action.connecting')}
          isConnected={isConnected}
          principalId={principalId}
        />
      )}
      {!isVerifying &&
        !isConnecting &&
        !isConnected &&
        isMobileScreen && (
          <PlugButton
            handleConnect={handleConnect}
            isMobileScreen={isMobileScreen}
            text={t('translation:buttons.action.connectToPlug')}
            isConnected={isConnected}
            principalId={principalId}
          />
        )}
      {!isVerifying &&
        !isConnecting &&
        !isConnected &&
        !isMobileScreen && (
          <PlugButton
            handleConnect={handleConnect}
            isMobileScreen={isMobileScreen}
            text={
              hasPlug
                ? t('translation:buttons.action.connectToPlug')
                : t('translation:buttons.action.installPlug')
            }
            isConnected={isConnected}
            principalId={principalId}
          />
        )}
      {!isVerifying && !isConnecting && isConnected && (
        <PlugButton
          handleConnect={() => {
            AppLog.warn('Already connected to plug!');
          }}
          isMobileScreen={isMobileScreen}
          text={getPlugButtonText({
            principalId,
            icnsName,
            loadingText: t('translation:buttons.action.loading'),
          })}
          isConnected={isConnected}
          principalId={principalId}
        />
      )}
    </>
  );
};
