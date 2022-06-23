import { Actor, HttpAgent } from '@dfinity/agent';
import { Secp256k1KeyIdentity } from '@dfinity/identity';
import fetch from 'isomorphic-fetch';
import mkpIdlFactory from './mkp-idl-factory.mjs';

if (!process.env.MARKETPLACE_ID) {
  throw Error('Oops! Missing envVar for Marketplace canister id');
}

(async () => {
  const identity = Secp256k1KeyIdentity.generate();
  const host = 'http://127.0.0.1:8000';
  const agent = new HttpAgent({ host, fetch, identity });
  const localMkpCanisterId = process.env.MARKETPLACE_ID;

  try {
    await agent.fetchRootKey();
  } catch (err) {
    console.warn(
      'Oops! Unable to fetch root key, is the local replica running?',
    );
    console.error(err);
  }

  const actorMkp = Actor.createActor(mkpIdlFactory, {
    canisterId: localMkpCanisterId,
    agent,
  });

  const result = await actorMkp.getCollections();

  console.log(result);
})();

