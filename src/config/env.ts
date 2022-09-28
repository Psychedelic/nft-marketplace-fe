type NodeEnv = 'development' | 'production' | 'test';

// eslint-disable-next-line operator-linebreak
const env: NodeEnv =
  // eslint-disable-next-line operator-linebreak
  (process.env.REACT_APP_NODE_ENV as unknown as NodeEnv) ||
  'development';

type ConfigParams = {
  host: string;
  nftCollectionId: string;
  kyasshuMarketplaceAPI: string;
  icScan: string;
  marketplaceCanisterId: string;
  wICPCanisterId: string;
  capRouterId: string;
};

type Config = {
  production: ConfigParams;
  staging: ConfigParams;
  development: ConfigParams;
  test: ConfigParams;
};

if (
  env === 'development' &&
  !(
    process.env.REACT_APP_MARKETPLACE_ID ||
    process.env.REACT_APP_CROWNS_ID ||
    process.env.REACT_APP_WICP_ID ||
    process.env.REACT_APP_CAP_ID
  )
) {
  throw Error('Oops! Missing local replica service canister ids');
}

const config: Config = {
  // The production version
  production: {
    host: 'https://ic0.app',
    kyasshuMarketplaceAPI: 'https://kyasshu.fleek.co',
    icScan: 'https://icscan.io/principal',
    nftCollectionId: 'vlhm2-4iaaa-aaaam-qaatq-cai',
    marketplaceCanisterId: 'getti-aiaaa-aaaah-abkkq-cai',
    wICPCanisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
    capRouterId: 'lj532-6iaaa-aaaah-qcc7a-cai',
  },
  // Staging (serverless, local-replica)
  // Is similar to the process we have for local development
  // but hosted in a AWS Server and the running services
  // are not expected to perform well but good enough for tests
  staging: {
    host: 'http://44.228.128.46:8000',
    kyasshuMarketplaceAPI: 'http://44.228.128.46:3000/local',
    icScan: 'https://icscan.io/principal',
    nftCollectionId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
    capRouterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
  },
  // Mainnet test environment
  // Provides the Service Canisters published to the Mainnet
  // where Kyasshu API is hosted in a AWS Server
  // and the cached data points to the same canister ids
  // listed in here
  test: {
    host: 'https://ic0.app',
    kyasshuMarketplaceAPI: 'https://kyasshu-dev.fleek.co',
    icScan: 'https://icscan.io/principal',
    nftCollectionId: 'iqvo2-7qaaa-aaaam-qacxa-cai',
    marketplaceCanisterId: 'o3ios-jaaaa-aaaag-qakqq-cai',
    wICPCanisterId: 'lassd-pqaaa-aaaag-qakpq-cai',
    capRouterId: 'lj532-6iaaa-aaaah-qcc7a-cai',
  },
  // The local development environment settings
  development: {
    host: 'http://127.0.0.1:8000',
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
    icScan: 'https://icscan.io/principal',
    nftCollectionId: process.env.REACT_APP_CROWNS_ID as string,
    marketplaceCanisterId: process.env
      .REACT_APP_MARKETPLACE_ID as string,
    wICPCanisterId: process.env.REACT_APP_WICP_ID as string,
    capRouterId: process.env.REACT_APP_CAP_ID as string,
  },
};

export default config[env];
