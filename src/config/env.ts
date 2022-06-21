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
  logsAppToken: string;
};

type Config = {
  production: ConfigParams;
  staging: ConfigParams;
  development: ConfigParams;
  test: ConfigParams;
};

const logsAppToken = process.env.REACT_APP_LOGS_APP_TOKEN || '';

const config: Config = {
  // The production version
  production: {
    host: 'https://mainnet.dfinity.network',
    kyasshuMarketplaceAPI: 'https://kyasshu-dev.fleek.co',
    icScan: 'https://icscan.io/principal',
    nftCollectionId: 'vlhm2-4iaaa-aaaam-qaatq-cai',
    marketplaceCanisterId: 'getti-aiaaa-aaaah-abkkq-cai',
    wICPCanisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
    capRouterId: 'lj532-6iaaa-aaaah-qcc7a-cai',
    logsAppToken,
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
    logsAppToken,
  },
  // Mainnet test environment
  // Provides the Service Canisters published to the Mainnet
  // where Kyasshu API is hosted in a AWS Server
  // and the cached data points to the same canister ids
  // listed in here
  test: {
    host: 'https://mainnet.dfinity.network',
    kyasshuMarketplaceAPI: 'https://kyasshu-dev.fleek.co',
    icScan: 'https://icscan.io/principal',
    nftCollectionId: 'vlhm2-4iaaa-aaaam-qaatq-cai',
    marketplaceCanisterId: 'o3ios-jaaaa-aaaag-qakqq-cai',
    wICPCanisterId: 'utozz-siaaa-aaaam-qaaxq-cai',
    capRouterId: 'lj532-6iaaa-aaaah-qcc7a-cai',
    logsAppToken,
  },
  // The local development environment settings
  development: {
    host: 'http://127.0.0.1:8000',
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
    icScan: 'https://icscan.io/principal',
    nftCollectionId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
    capRouterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
    logsAppToken,
  },
};

export default config[env];
