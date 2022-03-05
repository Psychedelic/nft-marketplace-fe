import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useThemeStore,
} from '../../../store';
import closeIcon from '../../../assets/closeIcon.svg';
import closeIconDark from '../../../assets/closeIcon-dark.svg';
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
  const { theme } = useThemeStore();

  return (
    <TraitChipContainer type="filtered">
      <TraitSpecsContainer>
        <TraitName>{name}</TraitName>
        <TraitRim>{rim}</TraitRim>
      </TraitSpecsContainer>
      <TraitActionContainer onClick={() => removeFilter()}>
        <TraitClear
          src={theme === 'lightTheme' ? closeIcon : closeIconDark}
          alt={t('translation:logoAlts.close')}
        />
      </TraitActionContainer>
    </TraitChipContainer>
  );
};
