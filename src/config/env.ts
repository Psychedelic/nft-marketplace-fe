type NodeEnv = 'development' | 'production' | 'test';

// eslint-disable-next-line operator-linebreak
const env: NodeEnv =
  // eslint-disable-next-line operator-linebreak
  (process.env.REACT_APP_NODE_ENV as unknown as NodeEnv) || 'development';

// The Crowns DIP-721 v2, canister ids are available in:
// https://github.com/Psychedelic/crowns/blob/main/canister_ids.json
// Where Mainnet crowns is "vlhm2-4iaaa-aaaam-qaatq-cai"
// and Crowns test is "iqvo2-7qaaa-aaaam-qacxa-cai"
// TODO: bear in mind that this is used for the kyasshu marketplace api
// as such, we have a temporary staging environment "iqvo2-7qaaa-aaaam-qacxa-cai"
// which is different from mainnet and the local <Important-1>
const NFT_CROWNS_CANISTER_ID = 'rkp4c-7iaaa-aaaaa-aaaca-cai';

type ConfigParams = {
  canisterId: string;
  host: string;
  collectionId: string;
  kyasshuMarketplaceAPI: string;
  icExplorer: string;
  crownsCanisterId: string;
  marketplaceCanisterId: string;
  wICPCanisterId: string;
};

type Config = {
  production: ConfigParams;
  staging: ConfigParams;
  development: ConfigParams;
  test: ConfigParams;
};

const config: Config = {
  production: {
    // TODO: this should be removed or have a none ambiguous name
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    // TODO: See <Important-1>
    // TODO: This is causing confusion, as we have a fieldname for crowns canister id
    // can we get rid of collectionId?
    collectionId: NFT_CROWNS_CANISTER_ID,
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
    icExplorer: 'https://dashboard.internetcomputer.org',
    crownsCanisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
  },
  staging: {
    // TODO: this should be removed or have a none ambiguous name
    canisterId: 'iqvo2-7qaaa-aaaam-qacxa-cai',
    host: 'https://mainnet.dfinity.network',
    // host: 'ic0.app',
    // TODO: See <Important-1>
    // TODO: This is causing confusion, as we have a fieldname for crowns canister id
    // can we get rid of collectionId?
    collectionId: 'iqvo2-7qaaa-aaaam-qacxa-cai',
    kyasshuMarketplaceAPI: 'https://kyasshu-dev.fleek.co',
    icExplorer: 'https://dashboard.internetcomputer.org',
    crownsCanisterId: 'iqvo2-7qaaa-aaaam-qacxa-cai',
    marketplaceCanisterId: 'surgh-pqaaa-aaaal-qauiq-cai',
    wICPCanisterId: 's5sn3-zyaaa-aaaal-qauja-cai',
  },
  development: {
    // TODO: this should be removed or have a none ambiguous name
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    // TODO: See <Important-1>
    // TODO: This is causing confusion, as we have a fieldname for crowns canister id
    // can we get rid of collectionId?
    collectionId: NFT_CROWNS_CANISTER_ID,
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
    icExplorer: 'https://dashboard.internetcomputer.org',
    crownsCanisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
  },
  test: {
    // TODO: this should be removed or have a none ambiguous name
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    // TODO: See <Important-1>
    // TODO: This is causing confusion, as we have a fieldname for crowns canister id
    // can we get rid of collectionId?
    collectionId: NFT_CROWNS_CANISTER_ID,
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
    icExplorer: 'https://dashboard.internetcomputer.org',
    crownsCanisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
  },
};

export default config[env];

// eslint-disable-next-line no-console
console.log(`Config ENV=${env}:`, config[env]);

