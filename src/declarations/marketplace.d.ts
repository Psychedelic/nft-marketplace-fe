import type { Principal } from '@dfinity/principal';

export interface BuyOffer {
  status: BuyOfferStatus;
  non_fungible_contract_address: Principal;
  token_id: bigint;
  price: bigint;
  payment_address: Principal;
}
export type BuyOfferStatus =
  | { Bought: null }
  | { CancelledByBuyer: null }
  | { Uninitialized: null }
  | { Created: null }
  | { CancelledBySeller: null };
export type FungibleTokenType = { DIP20: null };
export type MPApiError =
  | { NonExistentCollection: null }
  | { InvalidSaleOfferStatus: null }
  | { InsufficientFungibleBalance: null }
  | { InvalidSaleOffer: null }
  | { InvalidBuyOfferStatus: null }
  | { TransferNonFungibleError: null }
  | { Unauthorized: null }
  | { TransferFungibleError: null }
  | { InvalidBuyOffer: null }
  | { Other: null }
  | { InsufficientNonFungibleBalance: null }
  | { CAPInsertionError: null };
export type NonFungibleTokenType = { EXT: null } | { DIP721: null };
export type Result = { Ok: null } | { Err: MPApiError };
export type Result_1 = { Ok: bigint } | { Err: MPApiError };
export interface SaleOffer {
  status: SaleOfferStatus;
  is_direct_buyable: boolean;
  payment_address: Principal;
  list_price: bigint;
}
export type SaleOfferStatus =
  | { Selling: null }
  | { Uninitialized: null }
  | { Created: null };
export default interface _SERVICE {
  acceptBuyOffer: (arg_0: bigint) => Promise<Result>;
  addCollection: (
    arg_0: Principal,
    arg_1: number,
    arg_2: bigint,
    arg_3: string,
    arg_4: Principal,
    arg_5: NonFungibleTokenType,
    arg_6: Principal,
    arg_7: FungibleTokenType,
  ) => Promise<undefined>;
  cancelListingBySeller: (
    arg_0: Principal,
    arg_1: bigint,
  ) => Promise<Result>;
  cancelOfferByBuyer: (arg_0: bigint) => Promise<Result>;
  cancelOfferBySeller: (arg_0: bigint) => Promise<Result>;
  directBuy: (arg_0: Principal, arg_1: bigint) => Promise<Result>;
  getBuyOffers: (
    arg_0: bigint,
    arg_1: bigint,
  ) => Promise<Array<BuyOffer>>;
  getSaleOffers: () => Promise<
    Array<[[Principal, bigint], SaleOffer]>
  >;
  listForSale: (
    arg_0: Principal,
    arg_1: bigint,
    arg_2: bigint,
  ) => Promise<Result>;
  makeBuyOffer: (
    arg_0: Principal,
    arg_1: bigint,
    arg_2: bigint,
  ) => Promise<Result_1>;
  withdrawFungible: (
    arg_0: Principal,
    arg_1: FungibleTokenType,
  ) => Promise<Result>;
}
export default _SERVICE;
