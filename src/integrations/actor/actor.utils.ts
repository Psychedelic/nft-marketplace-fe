import fetch from 'cross-fetch';
import { Actor, HttpAgent } from '@dfinity/agent';
import { Secp256k1KeyIdentity } from '@dfinity/identity';
import nftIdlFactory from '../../declarations/nft.did';
import NFTIdlService from '../../declarations/nft';

export const actor = async () => {
  const httpAgent = new HttpAgent({
    host: 'http://127.0.0.1:8000',
    fetch,
  });
  const identity = Secp256k1KeyIdentity.generate();

  const agent = new HttpAgent({
    fetch,
    identity,
    source: httpAgent,
  });

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== 'production') {
    try {
      await agent.fetchRootKey();
    } catch (err) {
      console.warn(
        'Oops! Unable to fetch root key, is the local replica running?',
      );
      console.error(err);
    }
  }

  // Creates an actor by using NFTIdlService, nftIdlFactory and the HttpAgent
  return Actor.createActor<NFTIdlService>(nftIdlFactory, {
    // Change to the actual nft canister id
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    agent,
  });
};
