import React, { forwardRef, ChangeEvent } from 'react';
import { InputValidator } from './input-validator';
import { Container } from './styles';

export type FilterInputProps = {
  placeholder?: string;
  inputValue?: string;
  setValue?: (value: string) => void;
};

export const FilterInput = forwardRef<
  HTMLInputElement,
  FilterInputProps
>(({ placeholder = '', setValue, inputValue = '' }, ref) => {
  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event?.target?.value;
    if (setValue) {
      setValue(
        value !== '' ? Math.abs(Number(value)).toString() : value,
      );
    }
  };

  return (
    <Container name="filterInput">
      <InputValidator
        ref={ref}
        value={inputValue}
        name="filterInput"
        type="number"
        validator="wicp"
        placeholder={placeholder}
        onChange={handleValueChange}
      />
    </Container>
  );
});
