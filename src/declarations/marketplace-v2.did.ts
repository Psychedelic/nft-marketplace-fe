/* eslint-disable @typescript-eslint/naming-convention */
export default ({ IDL }: { IDL: any }) => {
  const GenericValue = IDL.Rec();
  const NFTStandard = IDL.Variant({ DIP721v2: IDL.Null });
  const FungibleStandard = IDL.Variant({ DIP20: IDL.Null });
  const Collection = IDL.Record({
    fee: IDL.Nat,
    creation_time: IDL.Nat64,
    owner: IDL.Principal,
    collection_id: IDL.Principal,
    collection_name: IDL.Text,
    marketplace_id: IDL.Principal,
    collection_standard: NFTStandard,
    fungible_id: IDL.Principal,
    fungible_volume: IDL.Nat,
    fungible_floor: IDL.Nat,
    fungible_standard: FungibleStandard,
  });
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
  const Result = IDL.Variant({ Ok: TokenData, Err: JellyError });
  const TxLogEntry = IDL.Record({
    to: IDL.Principal,
    from: IDL.Principal,
    memo: IDL.Text,
  });
  const Result_1 = IDL.Variant({
    Ok: IDL.Vec(TxLogEntry),
    Err: JellyError,
  });
  const Result_2 = IDL.Variant({ Ok: IDL.Nat, Err: JellyError });
  const Result_3 = IDL.Variant({
    Ok: IDL.Vec(TokenData),
    Err: JellyError,
  });
  const Event = IDL.Record({
    token_id: IDL.Text,
    traits: IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, GenericValue))),
    seller: IDL.Opt(IDL.Principal),
    fungible_id: IDL.Opt(IDL.Principal),
    operation: IDL.Text,
    buyer: IDL.Opt(IDL.Principal),
    price: IDL.Opt(IDL.Nat),
    nft_canister_id: IDL.Principal,
  });
  const Result_4 = IDL.Variant({ Ok: IDL.Null, Err: JellyError });
  const QueryRequest = IDL.Record({
    reverse: IDL.Opt(IDL.Bool),
    traits: IDL.Opt(IDL.Vec(IDL.Tuple(IDL.Text, GenericValue))),
    count: IDL.Opt(IDL.Nat64),
    last_index: IDL.Opt(IDL.Nat64),
    sort_key: IDL.Text,
    buyer: IDL.Opt(IDL.Principal),
  });
  const QueryResponse = IDL.Record({
    total: IDL.Nat64,
    data: IDL.Vec(TokenData),
    last_index: IDL.Opt(IDL.Nat64),
    error: IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    accept_offer: IDL.Func([TransactionArgs], [Result], []),
    balance_of: IDL.Func(
      [IDL.Principal],
      [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
      ['query'],
    ),
    cancel_listing: IDL.Func([TransactionArgs], [Result], []),
    cancel_offer: IDL.Func([TransactionArgs], [Result], []),
    deny_offer: IDL.Func([TransactionArgs], [Result], []),
    dfx_info: IDL.Func([], [IDL.Text], ['query']),
    direct_buy: IDL.Func([TransactionArgs], [Result], []),
    failed_log: IDL.Func([], [Result_1], ['query']),
    get_all_balances: IDL.Func(
      [],
      [
        IDL.Vec(
          IDL.Tuple(IDL.Tuple(IDL.Principal, IDL.Principal), IDL.Nat),
        ),
      ],
      ['query'],
    ),
    get_buyer_offers: IDL.Func(
      [IDL.Principal, IDL.Principal],
      [IDL.Vec(Offer)],
      ['query'],
    ),
    get_collections: IDL.Func([], [IDL.Vec(Collection)], ['query']),
    get_floor: IDL.Func([IDL.Principal], [Result_2], ['query']),
    get_protocol_fee: IDL.Func([], [IDL.Nat], ['query']),
    get_tokens: IDL.Func(
      [IDL.Principal, IDL.Vec(IDL.Text)],
      [Result_3],
      ['query'],
    ),
    git_commit_hash: IDL.Func([], [IDL.Text], ['query']),
    info: IDL.Func([], [Collection], ['query']),
    insert: IDL.Func([IDL.Vec(Event)], [Result_4], []),
    make_listing: IDL.Func([TransactionArgs], [Result], []),
    make_offer: IDL.Func([TransactionArgs], [Result], []),
    query: IDL.Func([QueryRequest], [QueryResponse], ['query']),
    rust_toolchain_info: IDL.Func([], [IDL.Text], ['query']),
    traits: IDL.Func(
      [IDL.Principal],
      [
        IDL.Vec(
          IDL.Tuple(
            IDL.Text,
            IDL.Vec(IDL.Tuple(GenericValue, IDL.Nat64)),
          ),
        ),
      ],
      ['query'],
    ),
    withdraw_fungible: IDL.Func(
      [IDL.Principal, FungibleStandard],
      [Result_4],
      [],
    ),
  });
};
