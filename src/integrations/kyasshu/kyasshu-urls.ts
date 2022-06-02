import config from '../../config/env';

export class KyasshuUrl {
  static getNFTs({
    sort,
    order,
    page,
    count,
  }: NSKyasshuUrl.GetNFTsQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.nftCollectionId}/nfts/${sort}/${order}/${page}?count=${count}`;
  }

  static getNFTDetails({
    id,
  }: NSKyasshuUrl.GetNFTDetailsQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.nftCollectionId}/nft/${id}`;
  }

  static getFilterTraits(): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.nftCollectionId}/data`;
  }

  static getCAPActivity({
    bucketId,
    pageCount,
  }: NSKyasshuUrl.GetCAPActivityQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/cap/txns/${bucketId}/?page=${pageCount}`;
  }

  static getCAPSync(): string {
    return `${config.kyasshuMarketplaceAPI}/cap/capSync`;
  }

  static getCollectionData(): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.nftCollectionId}/data`;
  }

  static getTokenTransactions({
    tokenId,
  }: NSKyasshuUrl.GetTokenTransactions): string {
    return `${config.kyasshuMarketplaceAPI}/cap/token/txns/${config.marketplaceCanisterId}/${tokenId}`;
  }

  static getSearchResults({
    sort,
    order,
    page,
    count,
  }: NSKyasshuUrl.GetSearchQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.nftCollectionId}/nfts/${sort}/${order}/${page}?count=${count}`;
  }
}

export namespace NSKyasshuUrl {
  export type GetNFTsQueryParams = {
    page: number;
    sort: string;
    order: string;
    count?: number;
  };

  export type GetNFTDetailsQueryParams = {
    id: string | number;
  };

  export type GetFilterTraitsQueryParams = {};

  export type GetCAPActivityQueryParams = {
    pageCount: string;
    bucketId: string;
  };

  export type GetTokenTransactions = {
    tokenId: number;
  };

  export type GetSearchQueryParams = {
    page: number;
    sort: string;
    order: string;
    count?: number;
  };
}
