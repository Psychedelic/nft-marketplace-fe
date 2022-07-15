import { formatICNSName } from '../../utils/icns';

type RequestConnectArgs = {
  whitelist?: string[];
  host?: string;
  onConnectionUpdate?: () => void;
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
