import React from 'react';
import { useTranslation } from 'react-i18next';
import wicpLogo from '../../../assets/wicpIcon.png';
import {
  CountContainer,
  CountLabel,
  CountInNumbers,
  CountLogo,
} from './styles';

export interface FilteredCountChipProps {
  label?: string;
  count?: string;
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
        <CountLogo src={wicpLogo} alt={t('translation:logoAlts.wicp')} />
      )}
    </CountContainer>
  );
};
