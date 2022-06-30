/* eslint-disable @typescript-eslint/naming-convention */
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CanisterStatusResponse {
  status: Status;
  memory_size: bigint;
  cycles: bigint;
  settings: DefiniteCanisterSettings;
  module_hash: [] | [Array<number>];
}
export interface DefiniteCanisterSettings {
  freezing_threshold: bigint;
  controllers: Array<Principal>;
  memory_allocation: bigint;
  compute_allocation: bigint;
}
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
export type Result = { Ok: CanisterStatusResponse } | { Err: string };
export type Status =
  | { stopped: null }
  | { stopping: null }
  | { running: null };
export interface WithWitnessArg {
  witness: boolean;
}
export interface Witness {
  certificate: Array<number>;
  tree: Array<number>;
}
export interface _SERVICE {
  bucket_status: ActorMethod<[Principal], Result>;
  custom_upgrade_root_bucket: ActorMethod<
    [Principal, [] | [Array<number>]],
    string
  >;
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
  git_commit_hash: ActorMethod<[], string>;
  insert_new_users: ActorMethod<
    [Principal, Array<Principal>],
    undefined
  >;
  install_bucket_code: ActorMethod<[Principal], undefined>;
  root_buckets_to_upgrade: ActorMethod<
    [],
    [bigint, Array<Principal>]
  >;
  trigger_upgrade: ActorMethod<[string], undefined>;
}

export default _SERVICE;

