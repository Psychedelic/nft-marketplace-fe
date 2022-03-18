import React, { forwardRef, ChangeEvent } from 'react';
import { Container, Input } from './styles';

export type FilterInputProps = {
  placeholder?: string;
  inputValue: string;
  setValue?: (value: string) => void;
};

export const FilterInput = forwardRef<HTMLInputElement, FilterInputProps>(
  ({ placeholder = '', setValue, inputValue }, ref) => {
    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event?.target?.value;
      if (setValue) {
        setValue(value);
      }
    };

    return (
      <Container name="filterInput">
        <Input
          ref={ref}
          value={inputValue}
          name="filterInput"
          type="number"
          placeholder={placeholder}
          onChange={handleValueChange}
        />
      </Container>
    );
  },
);
