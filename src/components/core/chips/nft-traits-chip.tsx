import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TraitChipContainer,
  TraitSpecsContainer,
  TraitName,
  TraitRim,
  Traitvalue,
} from './styles';

export interface NFTTraitsChipProps {
  name?: string;
  rimValue?: string;
}

export const NFTTraitsChip = ({ name, rimValue }: NFTTraitsChipProps) => {
  const { t } = useTranslation();

  return (
    <TraitChipContainer type="nft">
      <TraitSpecsContainer>
        <TraitRim type="nft">{t('translation:chips.labels.rim')}</TraitRim>
        <TraitName type="nft">{name}</TraitName>
        <Traitvalue>{rimValue}</Traitvalue>
      </TraitSpecsContainer>
    </TraitChipContainer>
  );
};
