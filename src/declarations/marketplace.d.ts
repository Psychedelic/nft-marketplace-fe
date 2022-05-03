/* eslint-disable @typescript-eslint/naming-convention */
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type FungibleStandard = { DIP20: null };
export interface Listing {
  status: ListingStatus;
  created: bigint;
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
export type Result_2 = { Ok: Listing } | { Err: MPApiError };
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
  balanceOf: ActorMethod<[Principal], Array<[Principal, bigint]>>;
  cancelListing: ActorMethod<[Principal, bigint], Result>;
  cancelOffer: ActorMethod<[Principal, bigint], Result>;
  denyOffer: ActorMethod<[Principal, bigint, Principal], Result>;
  directBuy: ActorMethod<[Principal, bigint], Result>;
  getAllBalances: ActorMethod<
    [],
    Array<[[Principal, Principal], bigint]>
  >;
  getBuyerOffers: ActorMethod<[Principal, Principal], Array<Offer>>;
  getFloor: ActorMethod<[Principal], Result_1>;
  getTokenListing: ActorMethod<[Principal, bigint], Result_2>;
  getTokenOffers: ActorMethod<
    [Principal, Array<bigint>],
    Array<[bigint, Array<Offer>]>
  >;
  makeListing: ActorMethod<[Principal, bigint, bigint], Result>;
  makeOffer: ActorMethod<[Principal, bigint, bigint], Result>;
  withdrawFungible: ActorMethod<
    [Principal, FungibleStandard],
    Result
  >;
}

export default _SERVICE;
