const env = process.env.NODE_ENV || 'development';

const NFT_CROWNS_CANISTER_ID = 'vlhm2-4iaaa-aaaam-qaatq-cai';

const config = {
  production: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: NFT_CROWNS_CANISTER_ID,
  },
  staging: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: NFT_CROWNS_CANISTER_ID,
  },
  development: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: NFT_CROWNS_CANISTER_ID,
  },
};

export default config[env];

// eslint-disable-next-line no-console
console.log(`Config ENV=${env}:`, config[env]);
