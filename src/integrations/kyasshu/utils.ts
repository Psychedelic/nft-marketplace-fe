import { useTranslation } from 'react-i18next';
import { useFilterStore } from '../../store';

export type CheckNFTOwnerParams = {
  isConnected: boolean;
  owner?: string;
  principalId?: string;
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
