import React from 'react';
import { useTranslation } from 'react-i18next';
import wicpLogo from '../../../assets/wicpIcon.png';
import {
  Container,
  Input,
  AmountTypeContainer,
  AmountTypeTitle,
  AmountTypeIcon,
} from './styles';

export const ModalInput = () => {
  const { t } = useTranslation();

  return (
    <Container name="modalInput">
      <Input
        name="modalInput"
        placeholder={t('translation:inputField.placeholder.amount')}
      />
      <AmountTypeContainer>
        <AmountTypeIcon src={wicpLogo} alt="WICP" />
        <AmountTypeTitle>WICP</AmountTypeTitle>
      </AmountTypeContainer>
    </Container>
  );
};
