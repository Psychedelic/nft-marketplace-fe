import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';

/* --------------------------------------------------------------------------
 * NavBar Component
 * --------------------------------------------------------------------------*/

export const NavBar = () => {
  const { t } = useTranslation();

  return (
    <Container>{t('translation:common.collectionName')}</Container>
  );
};
