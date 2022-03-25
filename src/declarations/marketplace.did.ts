/* eslint-disable */
export default ({ IDL }: { IDL: any }) => {
  const MPApiError = IDL.Variant({
    NonExistentCollection: IDL.Null,
    InvalidSaleOfferStatus: IDL.Null,
    InsufficientFungibleBalance: IDL.Null,
    InvalidSaleOffer: IDL.Null,
    InvalidBuyOfferStatus: IDL.Null,
    TransferNonFungibleError: IDL.Null,
    Unauthorized: IDL.Null,
    TransferFungibleError: IDL.Null,
    InvalidBuyOffer: IDL.Null,
    Other: IDL.Null,
    InsufficientNonFungibleBalance: IDL.Null,
    CAPInsertionError: IDL.Null,
  });
  const Result = IDL.Variant({ Ok: IDL.Null, Err: MPApiError });
  const NonFungibleTokenType = IDL.Variant({
    EXT: IDL.Null,
    DIP721: IDL.Null,
  });
  const FungibleTokenType = IDL.Variant({ DIP20: IDL.Null });
  const BuyOfferStatus = IDL.Variant({
    Bought: IDL.Null,
    CancelledByBuyer: IDL.Null,
    Uninitialized: IDL.Null,
    Created: IDL.Null,
    CancelledBySeller: IDL.Null,
  });
  const BuyOffer = IDL.Record({
    status: BuyOfferStatus,
    non_fungible_contract_address: IDL.Principal,
    token_id: IDL.Nat64,
    price: IDL.Nat,
    payment_address: IDL.Principal,
  });
  const SaleOfferStatus = IDL.Variant({
    Selling: IDL.Null,
    Uninitialized: IDL.Null,
    Created: IDL.Null,
  });
  const SaleOffer = IDL.Record({
    status: SaleOfferStatus,
    is_direct_buyable: IDL.Bool,
    payment_address: IDL.Principal,
    list_price: IDL.Nat,
  });
  const Result_1 = IDL.Variant({ Ok: IDL.Nat64, Err: MPApiError });
  return IDL.Service({
    acceptBuyOffer: IDL.Func([IDL.Nat64], [Result], []),
    addCollection: IDL.Func(
      [
        IDL.Principal,
        IDL.Nat16,
        IDL.Nat64,
        IDL.Text,
        IDL.Principal,
        NonFungibleTokenType,
        IDL.Principal,
        FungibleTokenType,
      ],
      [],
      [],
    ),
    cancelListingBySeller: IDL.Func(
      [IDL.Principal, IDL.Nat64],
      [Result],
      [],
    ),
    cancelOfferByBuyer: IDL.Func([IDL.Nat64], [Result], []),
    cancelOfferBySeller: IDL.Func([IDL.Nat64], [Result], []),
    directBuy: IDL.Func([IDL.Principal, IDL.Nat64], [Result], []),
    getBuyOffers: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [IDL.Vec(BuyOffer)],
      ['query'],
    ),
    getSaleOffers: IDL.Func(
      [],
      [
        IDL.Vec(
          IDL.Tuple(IDL.Tuple(IDL.Principal, IDL.Nat64), SaleOffer),
        ),
      ],
      ['query'],
    ),
    listForSale: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Nat],
      [Result],
      [],
    ),
    makeBuyOffer: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Nat],
      [Result_1],
      [],
    ),
    withdrawFungible: IDL.Func(
      [IDL.Principal, FungibleTokenType],
      [Result],
      [],
    ),
  });
};
