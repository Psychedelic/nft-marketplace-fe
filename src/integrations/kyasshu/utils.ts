import { useTranslation } from 'react-i18next';
import { useFilterStore } from '../../store';

export type CheckNFTOwnerParams = {
  isConnected: boolean;
  myNFTIds: string[];
  currentNFTId?: string;
};

export type VerifyConnectedOwnerParams = {
  isConnected: boolean;
  owner?: string;
  principalId?: string;
};

export const useTraitsPayload = () => {
  const { traits } = useFilterStore();

  return traits.filter((trait) => trait?.values?.length);
};

export const getTraitPayloadData = (traits: any) => {
  const traitData = traits.reduce(
    (acc: any, { name, values }: any) => ({
      ...acc,
      [name]: [...values],
    }),
    {},
  );

  return traitData;
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
  const { isConnected, myNFTIds, currentNFTId } = params;

  if (!isConnected || !currentNFTId || !myNFTIds.length) return false;

  if (myNFTIds.find((id: string) => id === currentNFTId.toString()))
    return true;

  return false;
};

export const verifyConnectedOwner = (
  params: VerifyConnectedOwnerParams,
) => {
  const { isConnected, owner, principalId } = params;

  if (!isConnected) return false;

  if (!owner) return false;

  if (!principalId) return false;

  if (owner !== principalId) return false;

  return true;
};
