import React from 'react';
import {
  TraitChipContainer,
  TraitSpecsContainer,
  TraitName,
  TraitLabel,
  Traitvalue,
} from './styles';

export interface NFTTraitsChipProps {
  label?: string;
  name?: string;
  rimValue?: string;
}

export const NFTTraitsChip = ({
  label,
  name,
  rimValue,
}: NFTTraitsChipProps) => (
  <TraitChipContainer type="nft">
    <TraitSpecsContainer>
      <TraitLabel type="nft">{label}</TraitLabel>
      <TraitName type="nft">{name ? name : '-'}</TraitName>
      <Traitvalue>{rimValue ? rimValue : '-'}</Traitvalue>
    </TraitSpecsContainer>
  </TraitChipContainer>
);
