import config from '../../config/env';

export class KyasshuUrl {
  static getNFTs({
    sort,
    order,
    page,
    count,
  }: KyasshuUrl.GetNFTsQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/nfts/${sort}/${order}/${page}?count=${count}`;
  }

  static getNFTDetails({
    id,
  }: KyasshuUrl.GetNFTDetailsQueryParams): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/nft/${id}`;
  }

  static getFilterTraits(): string {
    return `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/traits`;
  }
}

export namespace KyasshuUrl {
  export type GetNFTsQueryParams = {
    page: number;
    sort: string;
    order: string;
    count?: number;
  };

  export type GetNFTDetailsQueryParams = {
    id: string;
  };

  export type GetFilterTraits = {};
}
