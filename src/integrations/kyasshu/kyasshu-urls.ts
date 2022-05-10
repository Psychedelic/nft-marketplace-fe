import config from '../../config/env';

export class KyasshuUrl {
  static getNFTs({
    sort,
    order,
    page,
    count,
  }: NSKyasshuUrl.GetNFTsQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/nfts/${sort}/${order}/${page}?count=${count}`;
  }

  static getNFTDetails({
    id,
  }: NSKyasshuUrl.GetNFTDetailsQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/nft/${id}`;
  }

  static getFilterTraits(): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/traits`;
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
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/data`;
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
    id: string;
  };

  export type GetFilterTraitsQueryParams = {};

  export type GetCAPActivityQueryParams = {
    pageCount: number;
    bucketId: string;
  };
}
