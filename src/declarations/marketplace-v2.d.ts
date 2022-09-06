/* eslint-disable @typescript-eslint/naming-convention */
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Collection {
  fee: bigint;
  creation_time: bigint;
  owner: Principal;
  collection_id: Principal;
  collection_name: string;
  marketplace_id: Principal;
  collection_standard: NFTStandard;
  fungible_id: Principal;
  fungible_volume: bigint;
  fungible_floor: bigint;
  fungible_standard: FungibleStandard;
}
export interface Event {
  token_id: string;
  traits: [] | [Array<[string, GenericValue]>];
  seller: [] | [Principal];
  fungible_id: [] | [Principal];
  operation: string;
  buyer: [] | [Principal];
  price: [] | [bigint];
  nft_canister_id: Principal;
}
export type FungibleStandard = { DIP20: null };
export type GenericValue =
  | { Nat64Content: bigint }
  | { Nat32Content: number }
  | { BoolContent: boolean }
  | { Nat8Content: number }
  | { Int64Content: bigint }
  | { NatContent: bigint }
  | { Nat16Content: number }
  | { Int32Content: number }
  | { Int8Content: number }
  | { Int16Content: number }
  | { BlobContent: Array<number> }
  | { NestedContent: Array<[string, GenericValue]> }
  | { Principal: Principal }
  | { TextContent: string };
export type JellyError =
  | { IC: string }
  | { ICNS: string }
  | { InvalidCollection: null }
  | { DIP20: string }
  | { InsufficientFungibleBalance: null }
  | { DIP721: string }
  | { NotFound: null }
  | { InvalidListing: null }
  | { Unauthorized: null }
  | { InsufficientFungibleAllowance: null }
  | { InvalidOffer: null }
  | { InvalidOwner: null }
  | { Other: string }
  | { UnauthorizedProxy: null }
  | { InvalidOperator: null };
export interface LastSale {
  time: bigint;
  fungible: Principal;
  buyer: Principal;
  price: bigint;
}
export interface Listing {
  fee: Array<[string, Principal, bigint]>;
  status: ListingStatus;
  time: bigint;
  seller: Principal;
  fungible_id: Principal;
  price: bigint;
}
export type ListingStatus =
  | { Selling: null }
  | { Uninitialized: null }
  | { Created: null };
export type NFTStandard = { DIP721v2: null };
export interface Offer {
  status: OfferStatus;
  token_id: string;
  time: bigint;
  fungible_id: Principal;
  token_owner: Principal;
  buyer: Principal;
  price: bigint;
}
export type OfferStatus =
  | { Bought: null }
  | { Uninitialized: null }
  | { Denied: null }
  | { Cancelled: null }
  | { Created: null };
export interface QueryRequest {
  reverse: [] | [boolean];
  traits: [] | [Array<[string, GenericValue]>];
  count: [] | [bigint];
  last_index: [] | [bigint];
  sort_key: string;
  buyer: [] | [Principal];
}
export interface QueryResponse {
  total: bigint;
  data: Array<TokenData>;
  last_index: [] | [bigint];
  error: [] | [string];
}
export type Result = { Ok: null } | { Err: JellyError };
export type Result_1 =
  | { Ok: Array<TxLogEntry> }
  | { Err: JellyError };
export type Result_2 = { Ok: bigint } | { Err: JellyError };
export type Result_3 = { Ok: Array<TokenData> } | { Err: JellyError };
export interface TokenData {
  id: string;
  listing: [] | [Listing];
  last_sale_time: [] | [bigint];
  traits: [] | [Array<[string, GenericValue]>];
  offers: Array<Offer>;
  last_sale: [] | [LastSale];
  last_offer_time: [] | [bigint];
  last_listing_time: [] | [bigint];
}
export interface TransactionArgs {
  token_id: string;
  collection: Principal;
  seller: [] | [Principal];
  version: [] | [bigint];
  fungible_id: [] | [Principal];
  caller: [] | [Principal];
  buyer: [] | [Principal];
  price: [] | [bigint];
}
export interface TxLogEntry {
  to: Principal;
  from: Principal;
  memo: string;
}
export interface _SERVICE {
  accept_offer: ActorMethod<[TransactionArgs], Result>;
  balance_of: ActorMethod<[Principal], Array<[Principal, bigint]>>;
  cancel_listing: ActorMethod<[TransactionArgs], Result>;
  cancel_offer: ActorMethod<[TransactionArgs], Result>;
  deny_offer: ActorMethod<[TransactionArgs], Result>;
  dfx_info: ActorMethod<[], string>;
  direct_buy: ActorMethod<[TransactionArgs], Result>;
  failed_log: ActorMethod<[], Result_1>;
  get_all_balances: ActorMethod<
    [],
    Array<[[Principal, Principal], bigint]>
  >;
  get_buyer_offers: ActorMethod<[Principal, Principal], Array<Offer>>;
  get_collections: ActorMethod<[], Array<Collection>>;
  get_floor: ActorMethod<[Principal], Result_2>;
  get_protocol_fee: ActorMethod<[], bigint>;
  get_tokens: ActorMethod<[Principal, Array<string>], Result_3>;
  git_commit_hash: ActorMethod<[], string>;
  info: ActorMethod<[], Collection>;
  insert: ActorMethod<[Array<Event>], Result>;
  make_listing: ActorMethod<[TransactionArgs], Result>;
  make_offer: ActorMethod<[TransactionArgs], Result>;
  query: ActorMethod<[QueryRequest], QueryResponse>;
  rust_toolchain_info: ActorMethod<[], string>;
  withdraw_fungible: ActorMethod<
    [Principal, FungibleStandard],
    Result
  >;
}

export default _SERVICE;

