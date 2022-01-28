import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';

export const PendingStep = () => {
  const { t } = useTranslation();

  return (
    <Container>{t('translation:modals.placeholder.step')}</Container>
  );
};
