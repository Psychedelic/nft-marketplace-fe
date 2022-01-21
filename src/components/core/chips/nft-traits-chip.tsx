import React from 'react';
import { useTranslation } from 'react-i18next';

export const NFTTraitsChip = () => {
  const { t } = useTranslation();

  return <div>{t('translation:chips.placeholder')}</div>;
};
