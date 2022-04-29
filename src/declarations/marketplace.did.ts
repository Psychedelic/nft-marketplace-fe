/* eslint-disable */
export default ({ IDL }: { IDL: any }) => {
  const MPApiError = IDL.Variant({
    NonExistentCollection: IDL.Null,
    NoDeposit: IDL.Null,
    InvalidListingStatus: IDL.Null,
    InsufficientFungibleBalance: IDL.Null,
    InvalidListing: IDL.Null,
    TransferNonFungibleError: IDL.Null,
    Unauthorized: IDL.Null,
    InsufficientFungibleAllowance: IDL.Null,
    TransferFungibleError: IDL.Null,
    InvalidOffer: IDL.Null,
    Other: IDL.Text,
    InsufficientNonFungibleBalance: IDL.Null,
    InvalidOfferStatus: IDL.Null,
    InvalidOperator: IDL.Null,
    CAPInsertionError: IDL.Null,
  });
  const Result = IDL.Variant({ Ok: IDL.Null, Err: MPApiError });
  const NFTStandard = IDL.Variant({
    EXT: IDL.Null,
    DIP721v2: IDL.Null,
  });
  const FungibleStandard = IDL.Variant({ DIP20: IDL.Null });
  const OfferStatus = IDL.Variant({
    Bought: IDL.Null,
    Uninitialized: IDL.Null,
    Denied: IDL.Null,
    Cancelled: IDL.Null,
    Created: IDL.Null,
  });
  const Offer = IDL.Record({
    status: OfferStatus,
    created: IDL.Nat64,
    token_id: IDL.Nat,
    price: IDL.Nat,
    payment_address: IDL.Principal,
    nft_canister_id: IDL.Principal,
  });
  const Result_1 = IDL.Variant({ Ok: IDL.Nat, Err: MPApiError });
  const ListingStatus = IDL.Variant({
    Selling: IDL.Null,
    Uninitialized: IDL.Null,
    Created: IDL.Null,
  });
  const Listing = IDL.Record({
    status: ListingStatus,
    created: IDL.Nat64,
    price: IDL.Nat,
    payment_address: IDL.Principal,
  });
  const Result_2 = IDL.Variant({ Ok: Listing, Err: MPApiError });
  return IDL.Service({
    acceptOffer: IDL.Func(
      [IDL.Principal, IDL.Nat, IDL.Principal],
      [Result],
      [],
    ),
    addCollection: IDL.Func(
      [
        IDL.Principal,
        IDL.Nat,
        IDL.Nat64,
        IDL.Text,
        IDL.Principal,
        NFTStandard,
        IDL.Principal,
        FungibleStandard,
      ],
      [Result],
      [],
    ),
    balanceOf: IDL.Func(
      [IDL.Principal],
      [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
      ['query'],
    ),
    cancelListing: IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    cancelOffer: IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    denyOffer: IDL.Func(
      [IDL.Principal, IDL.Nat, IDL.Principal],
      [Result],
      [],
    ),
    directBuy: IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    getAllBalances: IDL.Func(
      [],
      [
        IDL.Vec(
          IDL.Tuple(IDL.Tuple(IDL.Principal, IDL.Principal), IDL.Nat),
        ),
      ],
      ['query'],
    ),
    getBuyerOffers: IDL.Func(
      [IDL.Principal, IDL.Principal],
      [IDL.Vec(Offer)],
      ['query'],
    ),
    getFloor: IDL.Func([IDL.Principal], [Result_1], ['query']),
    getTokenListing: IDL.Func(
      [IDL.Principal, IDL.Nat],
      [Result_2],
      ['query'],
    ),
    getTokenOffers: IDL.Func(
      [IDL.Principal, IDL.Vec(IDL.Nat)],
      [IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Vec(Offer)))],
      ['query'],
    ),
    makeListing: IDL.Func(
      [IDL.Principal, IDL.Nat, IDL.Nat],
      [Result],
      [],
    ),
    makeOffer: IDL.Func(
      [IDL.Principal, IDL.Nat, IDL.Nat],
      [Result],
      [],
    ),
    withdrawFungible: IDL.Func(
      [IDL.Principal, FungibleStandard],
      [Result],
      [],
    ),
  });
};
