/* eslint-disable */
type RequestConnectArgs = {
  whitelist?: string[];
  host?: string;
};

export const requestConnectToPlug = (args?: RequestConnectArgs) =>
  window.ic?.plug?.requestConnect(args);

export const isPlugInstalled = (global = window) =>
  (global?.ic && typeof global.ic?.plug === 'object') || false;
