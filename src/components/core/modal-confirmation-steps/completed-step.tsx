import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from './styles';

const CompletedStep = () => {
  const { t } = useTranslation();

  return <Container>{t('translation:modals.step')}</Container>;
};

export default CompletedStep;
