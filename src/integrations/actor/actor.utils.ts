import fetch from 'cross-fetch';
import { Actor, Agent, HttpAgent } from '@dfinity/agent';
import { Secp256k1KeyIdentity } from '@dfinity/identity';
import { Principal } from '@dfinity/principal';
import nftIdlFactory from '../../declarations/nft.did';
import NFTIdlService from '../../declarations/nft';
import marketplaceIdlFactory from '../../declarations/marketplace.did';
import MarketplaceIdlService from '../../declarations/marketplace';
import config from '../../config/env';

enum ServiceName {
  marketplace,
  crowns,
}

// export const createActor = async ({
//   serviceName = ServiceName.marketplace,
// }: {
//   serviceName?: ServiceName;
// })

const actorProvider = <T>({
  canisterId,
  agent,
  idlFactory,
}: {
  canisterId: string | Principal;
  agent: Agent;
  idlFactory: any;
}) =>
  Actor.createActor<T>(idlFactory, {
    canisterId,
    agent,
  });

export const createActor = async () => {
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

  return actorProvider<MarketplaceIdlService>({
    canisterId,
    agent,
    idlFactory: marketplaceIdlFactory,
  });
};
