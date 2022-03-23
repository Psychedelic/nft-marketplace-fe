import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useThemeStore,
} from '../../../store';
import closeIcon from '../../../assets/closeIcon.svg';
import closeIconDark from '../../../assets/closeIcon-dark.svg';
import miniDfinity from '../../../assets/mini-dfinity.svg';
import {
  TraitChipContainer,
  TraitSpecsContainer,
  TraitName,
  TraitRim,
  TraitActionContainer,
  TraitClear,
  Image,
} from './styles';

export interface FilteredTraitsChipProps {
  name?: string;
  rim?: string;
  appliedFilterValue: object;
  removeFilter: () => void;
}

export const FilteredTraitsChip = ({
  name,
  rim,
  appliedFilterValue,
  removeFilter,
}: FilteredTraitsChipProps) => {
  const { t } = useTranslation();
  const { theme } = useThemeStore();
  const isLightTheme = theme === 'lightTheme';

  return (
    <TraitChipContainer type="filtered">
      {appliedFilterValue.filterCategory === `${t('translation:filters.priceRange')}` && <Image src={miniDfinity} alt="mini-dfinity" />}
      <TraitSpecsContainer>
        <TraitName>{name}</TraitName>
        <TraitRim>{rim}</TraitRim>
      </TraitSpecsContainer>
      <TraitActionContainer onClick={() => removeFilter()}>
        <TraitClear
          src={isLightTheme ? closeIcon : closeIconDark}
          alt={t('translation:logoAlts.close')}
        />
      </TraitActionContainer>
    </TraitChipContainer>
  );
};
