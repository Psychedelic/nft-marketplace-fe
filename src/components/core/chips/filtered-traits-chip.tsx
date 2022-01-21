import React from 'react';
import { useTranslation } from 'react-i18next';
import closeIcon from '../../../assets/closeIcon.svg';
import {
  TraitChipContainer,
  TraitSpecsContainer,
  TraitName,
  TraitRim,
  TraitActionContainer,
  TraitClear,
} from './styles';

export interface FilteredTraitsChipProps {
  name?: string;
  rim?: string;
  removeFilter: () => void;
}

export const FilteredTraitsChip = ({
  name,
  rim,
  removeFilter,
}: FilteredTraitsChipProps) => {
  const { t } = useTranslation();

  return (
    <TraitChipContainer type="filtered">
      <TraitSpecsContainer>
        <TraitName>{name}</TraitName>
        <TraitRim>{rim}</TraitRim>
      </TraitSpecsContainer>
      <TraitActionContainer onClick={() => removeFilter()}>
        <TraitClear src={closeIcon} alt={t('translation:logoAlts.close')} />
      </TraitActionContainer>
    </TraitChipContainer>
  );
};
