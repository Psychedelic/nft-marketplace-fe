/* eslint-disable max-len */
import type { Principal } from '@dfinity/principal';

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
  direct_buy: boolean;
  price: bigint;
  payment_address: Principal;
}
export type ListingStatus = { Selling: null } | { Uninitialized: null } | { Created: null };
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
  | { CAPInsertionError: null };
export type NFTStandard = { EXT: null } | { DIP721v2: null };
export interface Offer {
  status: OfferStatus;
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
export interface _SERVICE {
  acceptOffer: (arg_0: Principal, arg_1: bigint, arg_2: Principal) => Promise<Result>;
  addCollection: (
    arg_0: Principal,
    arg_1: bigint,
    arg_2: bigint,
    arg_3: string,
    arg_4: Principal,
    arg_5: NFTStandard,
    arg_6: Principal,
    arg_7: FungibleStandard,
  ) => Promise<Result>;
  balanceOf: (arg_0: Principal) => Promise<Array<[Principal, FungibleBalance]>>;
  cancelListing: (arg_0: Principal, arg_1: bigint) => Promise<Result>;
  cancelOffer: (arg_0: Principal, arg_1: bigint) => Promise<Result>;
  denyOffer: (arg_0: bigint) => Promise<Result>;
  depositFungible: (arg_0: Principal, arg_1: FungibleStandard, arg_2: bigint) => Promise<Result>;
  depositNFT: (arg_0: Principal, arg_1: bigint) => Promise<Result>;
  directBuy: (arg_0: Principal, arg_1: bigint) => Promise<Result>;
  getAllBalances: () => Promise<Array<[[Principal, Principal], FungibleBalance]>>;
  getAllListings: () => Promise<Array<[[Principal, bigint], Listing]>>;
  getAllOffers: () => Promise<Array<[Principal, Array<[bigint, Array<[Principal, Offer]>]>]>>;
  makeListing: (arg_0: boolean, arg_1: Principal, arg_2: bigint, arg_3: bigint) => Promise<Result>;
  makeOffer: (arg_0: Principal, arg_1: bigint, arg_2: bigint) => Promise<Result>;
  serviceBalanceOf: (arg_0: Principal) => Promise<Array<BalanceMetadata>>;
  withdrawFungible: (arg_0: Principal, arg_1: FungibleStandard) => Promise<Result>;
  withdrawNFT: (arg_0: Principal, arg_1: bigint) => Promise<Result>;
}

export default _SERVICE;

