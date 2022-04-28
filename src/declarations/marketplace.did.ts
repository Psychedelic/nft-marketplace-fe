/* eslint-disable */
export default ({ IDL }: { IDL: any }) => {
  const GenericValue = IDL.Rec();
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
  const FungibleBalance = IDL.Record({
    locked: IDL.Nat,
    amount: IDL.Nat,
  });
  const ListingStatus = IDL.Variant({
    Selling: IDL.Null,
    Uninitialized: IDL.Null,
    Created: IDL.Null,
  });
  const Listing = IDL.Record({
    status: ListingStatus,
    created: IDL.Nat64,
    direct_buy: IDL.Bool,
    price: IDL.Nat,
    payment_address: IDL.Principal,
  });
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
  GenericValue.fill(
    IDL.Variant({
      Nat64Content: IDL.Nat64,
      Nat32Content: IDL.Nat32,
      BoolContent: IDL.Bool,
      Nat8Content: IDL.Nat8,
      Int64Content: IDL.Int64,
      IntContent: IDL.Int,
      NatContent: IDL.Nat,
      Nat16Content: IDL.Nat16,
      Int32Content: IDL.Int32,
      Int8Content: IDL.Int8,
      FloatContent: IDL.Float64,
      Int16Content: IDL.Int16,
      BlobContent: IDL.Vec(IDL.Nat8),
      NestedContent: IDL.Vec(IDL.Tuple(IDL.Text, GenericValue)),
      Principal: IDL.Principal,
      TextContent: IDL.Text,
    }),
  );
  const BalanceMetadata = IDL.Record({
    owner: IDL.Principal,
    details: IDL.Vec(IDL.Tuple(IDL.Text, GenericValue)),
    token_type: IDL.Text,
    standard: IDL.Text,
    contractId: IDL.Principal,
  });
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
      [IDL.Vec(IDL.Tuple(IDL.Principal, FungibleBalance))],
      ['query'],
    ),
    cancelListing: IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    cancelOffer: IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    denyOffer: IDL.Func(
      [IDL.Principal, IDL.Nat, IDL.Principal],
      [Result],
      [],
    ),
    depositFungible: IDL.Func(
      [IDL.Principal, FungibleStandard, IDL.Nat],
      [Result],
      [],
    ),
    directBuy: IDL.Func([IDL.Principal, IDL.Nat], [Result], []),
    getAllBalances: IDL.Func(
      [],
      [
        IDL.Vec(
          IDL.Tuple(
            IDL.Tuple(IDL.Principal, IDL.Principal),
            FungibleBalance,
          ),
        ),
      ],
      ['query'],
    ),
    getAllListings: IDL.Func(
      [IDL.Principal],
      [IDL.Vec(IDL.Tuple(IDL.Nat, Listing))],
      ['query'],
    ),
    getAllOffers: IDL.Func(
      [],
      [
        IDL.Vec(
          IDL.Tuple(
            IDL.Principal,
            IDL.Vec(
              IDL.Tuple(
                IDL.Nat,
                IDL.Vec(IDL.Tuple(IDL.Principal, Offer)),
              ),
            ),
          ),
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
    getTokenOffers: IDL.Func(
      [IDL.Principal, IDL.Vec(IDL.Nat)],
      [IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Vec(Offer)))],
      ['query'],
    ),
    makeListing: IDL.Func(
      [IDL.Bool, IDL.Principal, IDL.Nat, IDL.Nat],
      [Result],
      [],
    ),
    makeOffer: IDL.Func(
      [IDL.Principal, IDL.Nat, IDL.Nat],
      [Result],
      [],
    ),
    serviceBalanceOf: IDL.Func(
      [IDL.Principal],
      [IDL.Vec(BalanceMetadata)],
      ['query'],
    ),
    withdrawFungible: IDL.Func(
      [IDL.Principal, FungibleStandard],
      [Result],
      [],
    ),
  });
};
