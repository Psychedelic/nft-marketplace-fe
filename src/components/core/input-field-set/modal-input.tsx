import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Input } from './styles';

export const ModalInput = () => {
  const { t } = useTranslation();

  return (
    <Container name="modalInput">
      <Input
        name="modalInput"
        placeholder={t('translation:inputField.placeholder.amount')}
      />
    </Container>
  );
};
