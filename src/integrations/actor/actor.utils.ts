import fetch from 'cross-fetch';
import {
  Actor,
  Agent,
  HttpAgent,
  ActorSubclass,
} from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import crownsIdlFactory from '../../declarations/nft.did';
import crownsIdlService from '../../declarations/nft';
import wicpIdlFactory from '../../declarations/wicp.did';
import wicpIdlService from '../../declarations/wicp';
import marketplaceIdlFactory from '../../declarations/marketplace.did';
import marketplaceIdlService from '../../declarations/marketplace';
import config from '../../config/env';

type ServiceName = 'marketplace' | 'crowns' | 'wicp';

export const createActor = async <T>({
  serviceName = 'marketplace',
}: {
  serviceName?: ServiceName;
}) => {
  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== 'production') {
    try {
      await (window as any)?.ic?.plug?.agent.fetchRootKey();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn(
        'Oops! Unable to fetch root key, is the local replica running?',
      );
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  if (serviceName === 'crowns') {
    return await (window as any)?.ic?.plug?.createActor({
      canisterId: config.crownsCanisterId,
      interfaceFactory: crownsIdlFactory,
    });
  }

  if (serviceName === 'wicp') {
    return await (window as any)?.ic?.plug?.createActor({
      canisterId: config.wICPCanisterId,
      interfaceFactory: wicpIdlFactory,
    });
  }

  return await (window as any)?.ic?.plug?.createActor({
    canisterId: config.marketplaceCanisterId,
    interfaceFactory: marketplaceIdlFactory,
  });
};
