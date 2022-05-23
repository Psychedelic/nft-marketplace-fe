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
  production: {
    host: 'http://127.0.0.1:8000',
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
    icExplorer: 'https://dashboard.internetcomputer.org',
    nftCollectionId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
    capRouterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
  },
  staging: {
    host: 'http://44.228.128.46:8000',
    kyasshuMarketplaceAPI: 'http://44.228.128.46:3000/local',
    icExplorer: 'https://dashboard.internetcomputer.org',
    nftCollectionId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
    capRouterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
  },
  development: {
    host: 'http://127.0.0.1:8000',
    kyasshuMarketplaceAPI: 'http://localhost:3000/local',
    icExplorer: 'https://dashboard.internetcomputer.org',
    nftCollectionId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    marketplaceCanisterId: 'rdmx6-jaaaa-aaaaa-aaadq-cai',
    wICPCanisterId: 'qaa6y-5yaaa-aaaaa-aaafa-cai',
    capRouterId: 'rrkah-fqaaa-aaaaa-aaaaq-cai',
  },
  test: {
    host: 'http://127.0.0.1:8000',
    kyasshuMarketplaceAPI: 'https://kyasshu-dev.fleek.co',
    icExplorer: 'https://dashboard.internetcomputer.org',
    nftCollectionId: 'iqvo2-7qaaa-aaaam-qacxa-cai',
    marketplaceCanisterId: 'o3ios-jaaaa-aaaag-qakqq-cai',
    wICPCanisterId: 'lassd-pqaaa-aaaag-qakpq-cai',
    capRouterId: 'lhtux-ciaaa-aaaag-qakpa-cai',
  },
};

export default config[env];

// eslint-disable-next-line no-console
console.log(`Config ENV=${env}:`, config[env]);
