import React, { forwardRef, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import wicpLogo from '../../../assets/wicpIcon.png';
import {
  Container,
  Input,
  AmountTypeContainer,
  AmountTypeTitle,
  AmountTypeIcon,
} from './styles';

export type ModalInputProps = {
  placeholder?: string;
  setValue?: (value: string) => void;
  defaultValue?: string;
};

export const ModalInput = forwardRef<
  HTMLInputElement,
  ModalInputProps
>(({ placeholder = '', setValue, defaultValue = '' }, ref) => {
  const { t } = useTranslation();

  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event?.target?.value;
    if (setValue) {
      setValue(value);
    }
  };

  return (
    <Container name="modalInput">
      <Input
        ref={ref}
        name="modalInput"
        type="number"
        placeholder={placeholder}
        onChange={handleValueChange}
        defaultValue={defaultValue}
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
