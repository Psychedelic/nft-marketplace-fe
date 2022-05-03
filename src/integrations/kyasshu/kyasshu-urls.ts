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
}

export namespace KyasshuUrl {
  export type GetNFTsQueryParams = {
    page: number;
    sort: string;
    order: string;
    count?: number;
  };
}
