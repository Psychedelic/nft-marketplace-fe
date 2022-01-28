import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';

export const MakeOfferModal = () => {
  const { t } = useTranslation();

  return (
    <Container>{t('translation:modals.placeholder.modal')}</Container>
  );
};
