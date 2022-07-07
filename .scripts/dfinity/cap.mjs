import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { Secp256k1KeyIdentity } from '@dfinity/identity';
import fetch from 'cross-fetch';
import capRootIdlFactory from './cap-root-idl-factory.mjs';

(async () => {
  const identity = Secp256k1KeyIdentity.generate();
  const host = 'https://mainnet.dfinity.network';
  const agent = new HttpAgent({ host, fetch, identity });
  const capRootCanisterId = 'bqswi-zaaaa-aaaah-abkza-cai';
  const plugPrincipal =
    '6vj5p-imd5n-7gtwg-fskuc-bvuqy-65j54-xxdqw-gxikv-rkw4u-ocrmb-dqe';

  const actorMkp = Actor.createActor(capRootIdlFactory, {
    canisterId: capRootCanisterId,
    agent,
  });

  const result = await actorMkp.get_user_transactions({
    page: [0],
    user: Principal.fromText(plugPrincipal),
    witness: false,
  });

  console.log(result);
})();

