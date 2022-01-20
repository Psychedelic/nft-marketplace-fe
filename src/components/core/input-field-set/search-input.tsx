import React from 'react';
import { useTranslation } from 'react-i18next';

export const SearchInput = () => {
  const { t } = useTranslation();

  return <input placeholder={t('translation:inputField.placeholder')} />;
};
