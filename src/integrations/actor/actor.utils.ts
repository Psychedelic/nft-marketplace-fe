import fetch from 'cross-fetch';
import {
  Actor,
  Agent,
  HttpAgent,
  ActorSubclass,
} from '@dfinity/agent';
import { Secp256k1KeyIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';
import crownsIdlFactory from '../../declarations/nft.did';
import crownsIdlService from '../../declarations/nft';
import wicpIdlFactory from '../../declarations/wicp.did';
import wicpIdlService from '../../declarations/wicp';
import marketplaceIdlFactory from '../../declarations/marketplace.did';
import marketplaceIdlService from '../../declarations/marketplace';
import config from '../../config/env';

type ServiceName = 'marketplace' | 'crowns' | 'wicp';

const actorProvider = <T>({
  canisterId,
  agent,
  idlFactory,
}: {
  canisterId: string | Principal;
  agent: Agent;
  idlFactory: any;
}): ActorSubclass<T> =>
  Actor.createActor<T>(idlFactory, {
    canisterId,
    agent,
  });

export const createActor = async <T>({
  serviceName = 'marketplace',
}: {
  serviceName?: ServiceName;
}) => {
  console.log('[debug] createActor: serviceName:', serviceName);

  const httpAgent = new HttpAgent({
    host: config.host,
    fetch,
  });
  const identity = Secp256k1KeyIdentity.generate();

  const agent = new HttpAgent({
    fetch,
    identity,
    source: httpAgent,
  });

  const canisterId = config.marketplaceCanisterId;

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== 'production') {
    try {
      await agent.fetchRootKey();
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
    return actorProvider<crownsIdlService>({
      canisterId,
      agent,
      idlFactory: crownsIdlFactory,
    });
  }

  if (serviceName === 'wicp') {
    return actorProvider<wicpIdlService>({
      canisterId,
      agent,
      idlFactory: wicpIdlFactory,
    });
  }

  return actorProvider<marketplaceIdlService>({
    canisterId,
    agent,
    idlFactory: marketplaceIdlFactory,
  });
};
