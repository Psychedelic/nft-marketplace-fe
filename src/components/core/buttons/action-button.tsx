import React from 'react';
import { useTranslation } from 'react-i18next';

export const ActionButton = () => {
  const { t } = useTranslation();

  return <button type="button">{t('translation:buttons.getStarted')}</button>;
};
