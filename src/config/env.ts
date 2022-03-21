type NodeEnv = 'development' | 'production' | 'test';

// eslint-disable-next-line operator-linebreak
const env: NodeEnv =
  (process.env.NODE_ENV as unknown as NodeEnv) || 'development';

// The Crowns DIP-721 v2, canister ids are available in:
// https://github.com/Psychedelic/crowns/blob/main/canister_ids.json
// Where Mainnet crowns is "vlhm2-4iaaa-aaaam-qaatq-cai"
// and Crowns test is "iqvo2-7qaaa-aaaam-qacxa-cai"
const NFT_CROWNS_CANISTER_ID = 'iqvo2-7qaaa-aaaam-qacxa-cai';

type ConfigParams = {
  canisterId: string;
  host: string;
  collectionId: string;
  kyasshuMarketplaceAPI: string;
};
type Config = {
  production: ConfigParams;
  staging: ConfigParams;
  development: ConfigParams;
  test: ConfigParams;
};

const config: Config = {
  production: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: NFT_CROWNS_CANISTER_ID,
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
  },
  staging: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: NFT_CROWNS_CANISTER_ID,
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
  },
  development: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: NFT_CROWNS_CANISTER_ID,
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
  },
  test: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: NFT_CROWNS_CANISTER_ID,
  },
};

export default config[env];

// eslint-disable-next-line no-console
console.log(`Config ENV=${env}:`, config[env]);
