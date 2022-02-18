/* eslint-disable */
type RequestConnectArgs = {
  whitelist?: string[];
  host?: string;
};

export const requestConnectToPlug = (args?: RequestConnectArgs) =>
  window.ic?.plug?.requestConnect(args);

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
