import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';

export const OffersTable = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <p>{t('translation:tables.placeholder')}</p>
    </Container>
  );
};
