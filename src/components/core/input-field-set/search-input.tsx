import React, { forwardRef, ChangeEvent } from 'react';
import searchLogo from '../../../assets/searchIcon.svg';
import { Container, Input, SearchIcon } from './styles';

export type SearchInputProps = {
  placeholder?: string;
  setValue?: (value: string) => void;
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ placeholder = '', setValue }, ref) => {
    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event?.target?.value;
      if (setValue) {
        setValue(value);
      }
    };

    return (
      <Container name="searchInput">
        <SearchIcon src={searchLogo} alt="search" />
        <Input
          ref={ref}
          name="searchInput"
          type="text"
          placeholder={placeholder}
          onChange={handleValueChange}
        />
      </Container>
    );
  },
);
