/* eslint-disable max-len */
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface BalanceMetadata {
  owner: Principal;
  details: Array<[string, GenericValue]>;
  token_type: string;
  standard: string;
  contractId: Principal;
}
export interface FungibleBalance {
  locked: bigint;
  amount: bigint;
}
export type FungibleStandard = { DIP20: null };
export type GenericValue =
  | { Nat64Content: bigint }
  | { Nat32Content: number }
  | { BoolContent: boolean }
  | { Nat8Content: number }
  | { Int64Content: bigint }
  | { IntContent: bigint }
  | { NatContent: bigint }
  | { Nat16Content: number }
  | { Int32Content: number }
  | { Int8Content: number }
  | { FloatContent: number }
  | { Int16Content: number }
  | { BlobContent: Array<number> }
  | { NestedContent: Array<[string, GenericValue]> }
  | { Principal: Principal }
  | { TextContent: string };
export interface Listing {
  status: ListingStatus;
  created: bigint;
  direct_buy: boolean;
  price: bigint;
  payment_address: Principal;
}
export type ListingStatus =
  | { Selling: null }
  | { Uninitialized: null }
  | { Created: null };
export type MPApiError =
  | { NonExistentCollection: null }
  | { NoDeposit: null }
  | { InvalidListingStatus: null }
  | { InsufficientFungibleBalance: null }
  | { InvalidListing: null }
  | { TransferNonFungibleError: null }
  | { Unauthorized: null }
  | { InsufficientFungibleAllowance: null }
  | { TransferFungibleError: null }
  | { InvalidOffer: null }
  | { Other: string }
  | { InsufficientNonFungibleBalance: null }
  | { InvalidOfferStatus: null }
  | { InvalidOperator: null }
  | { CAPInsertionError: null };
export type NFTStandard = { EXT: null } | { DIP721v2: null };
export interface Offer {
  status: OfferStatus;
  created: bigint;
  token_id: bigint;
  price: bigint;
  payment_address: Principal;
  nft_canister_id: Principal;
}
export type OfferStatus =
  | { Bought: null }
  | { Uninitialized: null }
  | { Denied: null }
  | { Cancelled: null }
  | { Created: null };
export type Result = { Ok: null } | { Err: MPApiError };
export type Result_1 = { Ok: bigint } | { Err: MPApiError };
export interface _SERVICE {
  acceptOffer: ActorMethod<[Principal, bigint, Principal], Result>;
  addCollection: ActorMethod<
    [
      Principal,
      bigint,
      bigint,
      string,
      Principal,
      NFTStandard,
      Principal,
      FungibleStandard,
    ],
    Result
  >;
  balanceOf: ActorMethod<
    [Principal],
    Array<[Principal, FungibleBalance]>
  >;
  cancelListing: ActorMethod<[Principal, bigint], Result>;
  cancelOffer: ActorMethod<[Principal, bigint], Result>;
  denyOffer: ActorMethod<[Principal, bigint, Principal], Result>;
  depositFungible: ActorMethod<
    [Principal, FungibleStandard, bigint],
    Result
  >;
  directBuy: ActorMethod<[Principal, bigint], Result>;
  getAllBalances: ActorMethod<
    [],
    Array<[[Principal, Principal], FungibleBalance]>
  >;
  getAllListings: ActorMethod<[Principal], Array<[bigint, Listing]>>;
  getAllOffers: ActorMethod<
    [],
    Array<[Principal, Array<[bigint, Array<[Principal, Offer]>]>]>
  >;
  getBuyerOffers: ActorMethod<[Principal, Principal], Array<Offer>>;
  getFloor: ActorMethod<[Principal], Result_1>;
  getTokenOffers: ActorMethod<
    [Principal, Array<bigint>],
    Array<[bigint, Array<Offer>]>
  >;
  makeListing: ActorMethod<
    [boolean, Principal, bigint, bigint],
    Result
  >;
  makeOffer: ActorMethod<[Principal, bigint, bigint], Result>;
  serviceBalanceOf: ActorMethod<[Principal], Array<BalanceMetadata>>;
  withdrawFungible: ActorMethod<
    [Principal, FungibleStandard],
    Result
  >;
}

export default _SERVICE;
