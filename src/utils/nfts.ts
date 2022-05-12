import { NFTActionStatuses } from '../constants/common';
import{ TokenMetadataById } from '../store/features/tables/table-slice';

type NFTParams = {
  lastSalePrice?: string;
  lastSale?: string;
  lastModified?: string;
  lastOfferPrice?: string;
  currentPrice?: string;
};

export const findLastAction = (nft: NFTParams) => {
  if (nft?.lastSalePrice && nft?.lastSale === nft?.lastModified) {
    return NFTActionStatuses.Sold;
  }

  if (nft?.lastOfferPrice && nft?.lastModified) {
    return NFTActionStatuses.OfferReceived;
  }

  if (nft?.currentPrice && nft?.lastModified) {
    return NFTActionStatuses.ForSale;
  }

  return '';
};

// eslint-disable-next-line no-restricted-globals
export const isTokenId = (id: any) => typeof id !== 'undefined' && !isNaN(id) && Number(id) > -1

export const getTokenMetadataThumbnail = ({
  tokendId,
  tokenMetadataById,
}: {
  tokendId: string | number,
  tokenMetadataById: TokenMetadataById,
}) => typeof tokendId !== 'undefined' && tokenMetadataById[tokendId];