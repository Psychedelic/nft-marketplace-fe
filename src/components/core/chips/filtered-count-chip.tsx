import React from 'react';
import { useTranslation } from 'react-i18next';
import wicpImage from '../../../assets/wicp.svg';
import {
  CountContainer,
  CountLabel,
  CountInNumbers,
  CountLogo,
} from './styles';

export interface FilteredCountChipProps {
  label?: string;
  count?: number;
  showLogo?: boolean;
}

export const FilteredCountChip = ({
  label,
  count,
  showLogo,
}: FilteredCountChipProps) => {
  const { t } = useTranslation();

  return (
    <CountContainer>
      <CountLabel>{label}</CountLabel>
      <CountInNumbers>{count}</CountInNumbers>
      {showLogo && (
        <CountLogo
          src={wicpImage}
          alt={t('translation:logoAlts.wicp')}
        />
      )}
    </CountContainer>
  );
};
