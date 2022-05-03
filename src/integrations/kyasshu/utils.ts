import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useFilterStore } from '../../store';
import config from '../../config/env';
import { tableActions } from '../../store/features/tables';

export type CheckNFTOwnerParams = {
  isConnected: boolean;
  owner?: string;
  principalId?: string;
};

export type FetchCAPActivityProps = {
  dispatch: any;
  pageCount: number;
};

export type TokenMetadataProps = {
  dispatch: any;
  tokenId: any;
};

export const useTraitsPayload = () => {
  const { traits } = useFilterStore();

  return traits.filter((trait) => trait?.values?.length);
};

export const usePriceValues = () => {
  const { t } = useTranslation();
  const { defaultFilters } = useFilterStore();

  return defaultFilters.find(
    ({ filterCategory }) =>
      filterCategory === `${t('translation:filters.priceRange')}`,
  )?.filterName;
};

export const isNFTOwner = (params: CheckNFTOwnerParams) => {
  const { isConnected, owner, principalId } = params;

  if (!isConnected) return false;

  if (!owner) return false;

  if (!principalId) return false;

  if (owner !== principalId) return false;

  return true;
};

export const getTokenMetadata = async ({
  tokenId,
  dispatch,
}: TokenMetadataProps) => {
  try {
    const response = await axios.get(
      `${config.kyasshuMarketplaceAPI}/marketplace/${config.collectionId}/nft/${tokenId}`,
    );
    dispatch(
      tableActions.setTableMetadata(
        response?.data?.metadata?.thumbnail?.value?.TextContent,
      ),
    );
  } catch (error) {
    console.log(error);
  }
};
