import config from '../../config/env';

export class KyasshuUrl {
  static getNFTs({
    sort,
    order,
    page,
    count,
    collectionId,
  }: NSKyasshuUrl.GetNFTsQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${collectionId}/nfts/${sort}/${order}/${page}?count=${count}`;
  }

  static getNFTDetails({
    id,
    collectionId,
  }: NSKyasshuUrl.GetNFTDetailsQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${collectionId}/nft/${id}`;
  }

  static getFilterTraits({
    collectionId,
  }: NSKyasshuUrl.GetFilterTraitsQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${collectionId}/data`;
  }

  static getCAPActivity({
    bucketId,
    pageCount,
  }: NSKyasshuUrl.GetCAPActivityQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/cap/txns/${bucketId}/?page=${pageCount}`;
  }

  static getCAPJellySync(): string {
    return `${config.kyasshuMarketplaceAPI}/cap/capJellySync`;
  }

  static getCollectionData({
    collectionId,
  }: NSKyasshuUrl.GetCollectionDataQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${collectionId}/data`;
  }

  static getTokenTransactions({
    tokenId,
    collectionId,
  }: NSKyasshuUrl.GetTokenTransactions): string {
    return `${config.kyasshuMarketplaceAPI}/cap/token/txns/${collectionId}/${tokenId}`;
  }

  // TODO: Is getSearchResults still being in use?
  // if not then this and all related state handling removed...
  static getSearchResults({
    sort,
    order,
    page,
    count,
    collectionId,
  }: NSKyasshuUrl.GetSearchQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${collectionId}/nfts/${sort}/${order}/${page}?count=${count}`;
  }
}

export namespace NSKyasshuUrl {
  export type GetNFTsQueryParams = {
    page: number;
    sort: string;
    order: string;
    count?: number;
    collectionId: string;
  };

  export type GetNFTDetailsQueryParams = {
    id: string | number;
    collectionId: string;
  };

  export type GetFilterTraitsQueryParams = {
    collectionId: string;
  };

  export type GetCollectionDataQueryParams = {
    collectionId: string;
  };

  export type GetCAPActivityQueryParams = {
    pageCount: string;
    bucketId: string;
  };

  export type GetTokenTransactions = {
    tokenId: number;
    collectionId: string;
  };

  export type GetSearchQueryParams = {
    page: number;
    sort: string;
    order: string;
    count?: number;
    collectionId: string;
  };
}
