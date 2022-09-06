/* eslint-disable @typescript-eslint/naming-convention */
export default ({ IDL }: { IDL: any }) => {
  const GenericValue = IDL.Rec();
  const TransactionArgs = IDL.Record({
    token_id: IDL.Text,
    collection: IDL.Principal,
    seller: IDL.Opt(IDL.Principal),
    version: IDL.Opt(IDL.Nat64),
    fungible_id: IDL.Opt(IDL.Principal),
    caller: IDL.Opt(IDL.Principal),
    buyer: IDL.Opt(IDL.Principal),
    price: IDL.Opt(IDL.Nat),
  });
  const JellyError = IDL.Variant({
    IC: IDL.Text,
    ICNS: IDL.Text,
    InvalidCollection: IDL.Null,
    DIP20: IDL.Text,
    InsufficientFungibleBalance: IDL.Null,
    DIP721: IDL.Text,
    NotFound: IDL.Null,
    InvalidListing: IDL.Null,
    Unauthorized: IDL.Null,
    InsufficientFungibleAllowance: IDL.Null,
    InvalidOffer: IDL.Null,
    InvalidOwner: IDL.Null,
    Other: IDL.Text,
    UnauthorizedProxy: IDL.Null,
    InvalidOperator: IDL.Null,
  });
  const Result = IDL.Variant({ Ok: IDL.Null, Err: JellyError });
  const OfferStatus = IDL.Variant({
    Bought: IDL.Null,
    Uninitialized: IDL.Null,
    Denied: IDL.Null,
    Cancelled: IDL.Null,
    Created: IDL.Null,
  });
  const Offer = IDL.Record({
    status: OfferStatus,
    token_id: IDL.Text,
    time: IDL.Nat64,
    fungible_id: IDL.Principal,
    token_owner: IDL.Principal,
    buyer: IDL.Principal,
    price: IDL.Nat,
  });
  const ListingStatus = IDL.Variant({
    Selling: IDL.Null,
    Uninitialized: IDL.Null,
    Created: IDL.Null,
  });
  const Listing = IDL.Record({
    fee: IDL.Vec(IDL.Tuple(IDL.Text, IDL.Principal, IDL.Nat)),
    status: ListingStatus,
    time: IDL.Nat64,
    seller: IDL.Principal,
    fungible_id: IDL.Principal,
    price: IDL.Nat,
  });
  GenericValue.fill(
    IDL.Variant({
      Nat64Content: IDL.Nat64,
      Nat32Content: IDL.Nat32,
      BoolContent: IDL.Bool,
      Nat8Content: IDL.Nat8,
      Int64Content: IDL.Int64,
      NatContent: IDL.Nat,
      Nat16Content: IDL.Nat16,
      Int32Content: IDL.Int32,
      Int8Content: IDL.Int8,
      Int16Content: IDL.Int16,
      BlobContent: IDL.Vec(IDL.Nat8),
      NestedContent: IDL.Vec(IDL.Tuple(IDL.Text, GenericValue)),
      Principal: IDL.Principal,
      TextContent: IDL.Text,
    }),
  );
  const LastSale = IDL.Record({
    time: IDL.Nat64,
    fungible: IDL.Principal,
    buyer: IDL.Principal,
    price: IDL.Nat,
  });
  const TokenData = IDL.Record({
    id: IDL.Text,
    listing: IDL.Opt(Listing),
    last_sale_time: IDL.Opt(IDL.Nat64),
    traits: IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, GenericValue))),
    offers: IDL.Vec(Offer),
    last_sale: IDL.Opt(LastSale),
    last_offer_time: IDL.Opt(IDL.Nat64),
    last_listing_time: IDL.Opt(IDL.Nat64),
  });
  const QueryRequest = IDL.Record({
    reverse: IDL.Opt(IDL.Bool),
    traits: IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, GenericValue))),
    count: IDL.Opt(IDL.Nat64),
    last_index: IDL.Opt(IDL.Nat64),
    sort_key: IDL.Text,
  });
  const QueryResponse = IDL.Record({
    total: IDL.Nat64,
    data: IDL.Vec(TokenData),
    last_index: IDL.Opt(IDL.Nat64),
    error: IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    make_listing: IDL.Func([TransactionArgs], [Result], []),
    make_offer: IDL.Func([TransactionArgs], [Result], []),
    query: IDL.Func([QueryRequest], [QueryResponse], ['query']),
  });
};

