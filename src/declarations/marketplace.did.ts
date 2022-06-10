/* eslint-disable @typescript-eslint/naming-convention */
export default ({ IDL }: { IDL: any }) => {
  const MPApiError = IDL.Variant({
    TransferFromFungibleError: IDL.Text,
    NonExistentCollection: IDL.Null,
    NoDeposit: IDL.Null,
    InvalidListingStatus: IDL.Null,
    InsufficientFungibleBalance: IDL.Null,
    InvalidListing: IDL.Null,
    TransferFromNonFungibleError: IDL.Text,
    TransferNonFungibleError: IDL.Null,
    Unauthorized: IDL.Null,
    InsufficientFungibleAllowance: IDL.Null,
    TransferFungibleError: IDL.Null,
    InvalidOffer: IDL.Null,
    InvalidOwner: IDL.Null,
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
    token_owner: IDL.Principal,
    buyer: IDL.Principal,
    price: IDL.Nat,
    nft_canister_id: IDL.Principal,
  });
  const Collection = IDL.Record({
    collection_fee: IDL.Nat,
    creation_time: IDL.Nat64,
    nft_canister_standard: NFTStandard,
    owner: IDL.Principal,
    collection_name: IDL.Text,
    fungible_volume: IDL.Nat,
    fungible_canister_standard: FungibleStandard,
    fungible_canister_id: IDL.Principal,
    nft_canister_id: IDL.Principal,
  });
  const Result_1 = IDL.Variant({ Ok: IDL.Nat, Err: MPApiError });
  const ListingStatus = IDL.Variant({
    Selling: IDL.Null,
    Uninitialized: IDL.Null,
    Created: IDL.Null,
  });
  const Listing = IDL.Record({
    fee: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Principal, IDL.Nat)),
    status: ListingStatus,
    created: IDL.Nat64,
    seller: IDL.Principal,
    price: IDL.Nat,
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
    dfxInfo: IDL.Func([], [IDL.Text], ['query']),
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
    getCollections: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Principal, Collection))],
      ['query'],
    ),
    getFloor: IDL.Func([IDL.Principal], [Result_1], ['query']),
    getProtocolFee: IDL.Func([], [IDL.Nat], ['query']),
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
    gitCommitHash: IDL.Func([], [IDL.Text], ['query']),
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
    rustToolchainInfo: IDL.Func([], [IDL.Text], ['query']),
    setProtocolFee: IDL.Func([IDL.Nat], [Result], []),
    withdrawFungible: IDL.Func(
      [IDL.Principal, FungibleStandard],
      [Result],
      [],
    ),
  });
};
