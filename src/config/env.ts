const env = process.env.NODE_ENV || 'development';

const config = {
  production: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: 'vlhm2-4iaaa-aaaam-qaatq-cai',
  },
  staging: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: 'vlhm2-4iaaa-aaaam-qaatq-cai',
  },
  development: {
    canisterId: 'rkp4c-7iaaa-aaaaa-aaaca-cai',
    host: 'http://127.0.0.1:8000',
    collectionId: 'vlhm2-4iaaa-aaaam-qaatq-cai',
  },
};

export default config[env];

// eslint-disable-next-line no-console
console.log(`Config ENV=${env}:`, config[env]);
