/* eslint-disable @typescript-eslint/naming-convention */
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface GetIndexCanistersResponse {
  witness: [] | [Witness];
  canisters: Array<Principal>;
}
export interface GetTokenContractRootBucketArg {
  witness: boolean;
  canister: Principal;
}
export interface GetTokenContractRootBucketResponse {
  witness: [] | [Witness];
  canister: [] | [Principal];
}
export interface GetUserRootBucketsArg {
  user: Principal;
  witness: boolean;
}
export interface GetUserRootBucketsResponse {
  witness: [] | [Witness];
  contracts: Array<Principal>;
}
export interface WithWitnessArg {
  witness: boolean;
}
export interface Witness {
  certificate: Array<number>;
  tree: Array<number>;
}
export interface _SERVICE {
  deploy_plug_bucket: ActorMethod<[Principal, bigint], undefined>;
  get_index_canisters: ActorMethod<
    [WithWitnessArg],
    GetIndexCanistersResponse
  >;
  get_token_contract_root_bucket: ActorMethod<
    [GetTokenContractRootBucketArg],
    GetTokenContractRootBucketResponse
  >;
  get_user_root_buckets: ActorMethod<
    [GetUserRootBucketsArg],
    GetUserRootBucketsResponse
  >;
  insert_new_users: ActorMethod<
    [Principal, Array<Principal>],
    undefined
  >;
  install_bucket_code: ActorMethod<[Principal], undefined>;
  trigger_upgrade: ActorMethod<[], undefined>;
}

export default _SERVICE;
