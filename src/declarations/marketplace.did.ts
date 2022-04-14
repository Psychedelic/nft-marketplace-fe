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
    TransferFungibleError: IDL.Null,
    InvalidOffer: IDL.Null,
    Other: IDL.Text,
    InsufficientNonFungibleBalance: IDL.Null,
    InvalidOfferStatus: IDL.Null,
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
    token_id: IDL.Nat64,
    price: IDL.Nat,
    payment_address: IDL.Principal,
    nft_canister_id: IDL.Principal,
  });
  return IDL.Service({
    acceptOffer: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Principal],
      [Result],
      [],
    ),
    addCollection: IDL.Func(
      [
        IDL.Principal,
        IDL.Nat16,
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
    cancelListing: IDL.Func([IDL.Principal, IDL.Nat64], [Result], []),
    cancelOffer: IDL.Func([IDL.Principal, IDL.Nat64], [Result], []),
    denyOffer: IDL.Func([IDL.Nat64], [Result], []),
    depositFungible: IDL.Func(
      [IDL.Principal, FungibleStandard, IDL.Nat],
      [Result],
      [],
    ),
    depositNFT: IDL.Func([IDL.Principal, IDL.Nat64], [Result], []),
    directBuy: IDL.Func([IDL.Principal, IDL.Nat64], [Result], []),
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
      [],
      [
        IDL.Vec(
          IDL.Tuple(IDL.Tuple(IDL.Principal, IDL.Nat64), Listing),
        ),
      ],
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
                IDL.Nat64,
                IDL.Vec(IDL.Tuple(IDL.Principal, Offer)),
              ),
            ),
          ),
        ),
      ],
      ['query'],
    ),
    makeListing: IDL.Func(
      [IDL.Bool, IDL.Principal, IDL.Nat64, IDL.Nat],
      [Result],
      [],
    ),
    makeOffer: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Nat],
      [Result],
      [],
    ),
    withdrawFungible: IDL.Func(
      [IDL.Principal, FungibleStandard],
      [Result],
      [],
    ),
    withdrawNFT: IDL.Func([IDL.Principal, IDL.Nat64], [Result], []),
  });
};
