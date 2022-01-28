import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';

export const CancelOfferModal = () => {
  const { t } = useTranslation();

  return (
    <Container>{t('translation:modals.placeholder.modal')}</Container>
  );
};
