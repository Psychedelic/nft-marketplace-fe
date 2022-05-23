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
  icExplorer: string;
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

const config: Config = {
  // The production version
  production: {
    host: 'http://127.0.0.1:8000',
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
    icExplorer: 'https://dashboard.internetcomputer.org',
    nftCollectionId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
    capRouterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
  },
  // Staging (serverless, local-replica)
  // Is similar to the process we have for local development
  // but hosted in a AWS Server and the running services
  // are not expected to perform well but good enough for tests
  staging: {
    host: 'http://44.228.128.46:8000',
    kyasshuMarketplaceAPI: 'http://44.228.128.46:3000/local',
    icExplorer: 'https://dashboard.internetcomputer.org',
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
    host: 'http://127.0.0.1:8000',
    kyasshuMarketplaceAPI: 'https://kyasshu-dev.fleek.co',
    icExplorer: 'https://dashboard.internetcomputer.org',
    nftCollectionId: 'iqvo2-7qaaa-aaaam-qacxa-cai',
    marketplaceCanisterId: 'o3ios-jaaaa-aaaag-qakqq-cai',
    wICPCanisterId: 'lassd-pqaaa-aaaag-qakpq-cai',
    capRouterId: 'lhtux-ciaaa-aaaag-qakpa-cai',
  },
  // The local development environment settings
  development: {
    host: 'http://127.0.0.1:8000',
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
    icExplorer: 'https://dashboard.internetcomputer.org',
    nftCollectionId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
    capRouterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
  },
};

export default config[env];

// eslint-disable-next-line no-console
console.log(`Config ENV=${env}:`, config[env]);
