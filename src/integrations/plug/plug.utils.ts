import { formatICNSName } from '../../utils/icns';
import {
  PlugStatusCodes,
  PLUG_WALLET_WEBSITE_URL,
} from '../../constants';
import { notificationActions, plugActions } from '../../store';
import { AppLog } from '../../utils/log';
import config from '../../config/env';
// TODO: mobile wallet connection
// import {
//   Provider,
//   WalletConnectRPC,
// } from '@psychedelic/plug-inpage-provider';

type RequestConnectArgs = {
  whitelist?: string[];
  host?: string;
  onConnectionUpdate?: (dispatch: any) => void;
};

type ConnectionUpdateTypes = {
  dispatch: any;
};

type HandleConnectTypes = {
  dispatch: any;
  t: any;
};

type PlugButtonTextParams = {
  icnsName?: string;
  principalId?: string;
  loadingText: string;
};

export const requestConnectToPlug = (args?: RequestConnectArgs) =>
  window.ic?.plug?.requestConnect(args);

export const createPlugAgent = async (args?: RequestConnectArgs) => {
  await window.ic?.plug?.createAgent(args);

  if (process.env.NODE_ENV !== 'production') {
    await window.ic?.plug?.agent?.fetchRootKey();
  }

  return window.ic?.plug?.agent;
};

export const isPlugInstalled = (global = window) =>
  (global?.ic && typeof global.ic?.plug === 'object') || false;

export const checkIsConnected = () => window.ic?.plug?.isConnected();

export const getPrincipal = () => window.ic?.plug?.getPrincipal();

export const formatAddress = (address: string) => {
  if (!address) {
    return '';
  }
  return `${address.substring(0, 5)}...${address.substring(
    address.length - 3,
    address.length,
  )}`;
};

export const hasPlugAgent = () => window.ic?.plug?.agent;

export const disconnectPlug = () => window.ic?.plug?.disconnect();

export const getPlugWalletBalance = () =>
  window.ic?.plug?.requestBalance();

export const getICNSInfo = () => window.ic?.plug?.getICNSInfo();

export const getPlugButtonText = (params: PlugButtonTextParams) => {
  const { icnsName, principalId, loadingText } = params;

  if (!principalId) return loadingText;

  if (icnsName) return formatICNSName(icnsName as string);

  return formatAddress(principalId as string);
};

export const onConnectionUpdate = ({
  dispatch,
}: ConnectionUpdateTypes) => {
  // TODO: Rehydrate the data for the switched account
  disconnectPlug();

  // connected to plug
  dispatch(plugActions.setIsConnected(false));

  console.warn(
    'Oops! Disconnected Plug user, as Plug account was switched',
  );
};

export const handleConnect = async ({
  dispatch,
  t,
}: HandleConnectTypes) => {
  const { wICPCanisterId, host } = config;

  const whitelist = [wICPCanisterId];

  // TODO: handle mobile wallet connection

  // const ua = navigator.userAgent;
  // const isAndroid = /android/i.test(ua) ? true : false;

  // if (!isAndroid) {
  //   window.open('https://plugwallet.ooo/', '_blank');
  //   return;
  // }
  // const clientRPC = new WalletConnectRPC(window);

  // const plugProvider = new Provider(clientRPC);

  // const ic = (window as any).ic || {};
  // (window as any).ic = {
  //   ...ic,
  //   plug: plugProvider,
  // };

  // Is plug installed
  const hasPlug = isPlugInstalled();
  if (!hasPlug) {
    // Ask user to install plug
    window.open(PLUG_WALLET_WEBSITE_URL, '_blank');
    return;
  }

  // connect to plug if installed
  try {
    // verifying plug connection
    dispatch(
      plugActions.setConnectionStatus(PlugStatusCodes.Connecting),
    );

    // request app to connect with plug
    const connected = await requestConnectToPlug({
      whitelist,
      host,
      onConnectionUpdate,
    });

    if (!connected) {
      throw Error('Oops! Failed to connect to plug.');
    }

    const agentCreated = await createPlugAgent({
      whitelist,
      host,
    });

    if (!agentCreated) {
      throw Error('Oops! Failed to create plug agent.');
    }

    // connected to plug
    dispatch(plugActions.setIsConnected(true));
  } catch (err) {
    // failed to connect plug
    AppLog.error(err);
    dispatch(
      notificationActions.setErrorMessage(
        t('translation:errorMessages.unableToConnectToPlug'),
      ),
    );
    dispatch(plugActions.setIsConnected(false));
  }
};
