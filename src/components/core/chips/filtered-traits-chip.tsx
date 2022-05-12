import { useTranslation } from 'react-i18next';
import wicpIcon from '../../../assets/wicp.svg';
import {
  TraitChipContainer,
  TraitSpecsContainer,
  TraitName,
  TraitRim,
  TraitActionContainer,
  Image,
} from './styles';
import { Icon } from '../../icons';

export interface FilteredTraitsChipProps {
  name?: string;
  rim?: string;
  appliedFilterValue?: any;
  removeFilter: () => void;
}

export const FilteredTraitsChip = ({
  name,
  rim,
  appliedFilterValue = {},
  removeFilter,
}: FilteredTraitsChipProps) => {
  const { t } = useTranslation();

  return (
    <TraitChipContainer type="filtered">
      {appliedFilterValue.filterCategory ===
        `${t('translation:filters.priceRange')}` && (
        <Image src={wicpIcon} alt="mini-dfinity" />
      )}
      <TraitSpecsContainer>
        <TraitName>{name}</TraitName>
        <TraitRim>{rim}</TraitRim>
      </TraitSpecsContainer>
      <TraitActionContainer onClick={() => removeFilter()}>
        <Icon icon="close" size="md" />
      </TraitActionContainer>
    </TraitChipContainer>
  );
};
