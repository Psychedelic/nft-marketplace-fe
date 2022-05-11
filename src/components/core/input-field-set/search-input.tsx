import React, { forwardRef, ChangeEvent } from 'react';
import { Container, Input, SearchIcon } from './styles';

export type SearchInputProps = {
  placeholder?: string;
  setValue?: (value: string) => void;
  handleClick?: () => void;
  handleSearch?: (value: string) => void;
};

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(
  (
    { placeholder = '', setValue, handleClick, handleSearch },
    ref,
  ) => {
    const handleValueChange = (
      event: ChangeEvent<HTMLInputElement>,
    ) => {
      const value = event?.target?.value;
      if (setValue) {
        setValue(value);
      }
      // eslint-disable-next-line
      handleSearch && handleSearch(value);
    };

    return (
      <Container name="searchInput" onClick={handleClick}>
        <SearchIcon icon="search" />
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
