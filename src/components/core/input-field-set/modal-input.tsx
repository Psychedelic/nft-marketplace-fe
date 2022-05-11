import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import wicpLogo from '../../../assets/wicp.svg';
import {
  Container,
  Input,
  AmountTypeContainer,
  AmountTypeTitle,
  AmountTypeIcon,
} from './styles';

export type ModalInputProps = React.ComponentProps<typeof Input>;

export const ModalInput = forwardRef<
  HTMLInputElement,
  ModalInputProps
>((inputProps, ref) => {
  const { t } = useTranslation();

  return (
    <Container name="modalInput">
      <Input
        ref={ref}
        name="modalInput"
        type="number"
        {...inputProps}
      />
      <AmountTypeContainer>
        <AmountTypeIcon src={wicpLogo} alt="WICP" />
        <AmountTypeTitle>
          {t('translation:inputField.amountTypes.wicp')}
        </AmountTypeTitle>
      </AmountTypeContainer>
    </Container>
  );
});
