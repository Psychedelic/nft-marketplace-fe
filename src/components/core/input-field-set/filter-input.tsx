import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Input } from './styles';

export const FilterInput = () => {
  const { t } = useTranslation();

  return (
    <Container name="filterInput">
      <Input
        name="filterInput"
        placeholder={t('translation:inputField.placeholder.priceMin')}
      />
    </Container>
  );
};
