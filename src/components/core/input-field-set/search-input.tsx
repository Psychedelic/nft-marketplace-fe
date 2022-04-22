import React, { forwardRef, ChangeEvent } from 'react';
import searchLogo from '../../../assets/searchIcon.svg';
import { Container, Input, SearchIcon } from './styles';

export type SearchInputProps = {
  placeholder?: string;
  setValue?: (value: string) => void;
  handleClick?: () => void;
  handleSearch?: () => void;
  debounceInput?: (value : any) => void;
};

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(({ placeholder = '', setValue, handleClick, handleSearch, debounceInput }, ref) => {
  const handleValueChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event?.target?.value;
    if (setValue) {
      setValue(value);
    }
    // eslint-disable-next-line
    debounceInput && debounceInput(value);
    // eslint-disable-next-line
    handleSearch && handleSearch();
  };

  return (
    <Container name="searchInput" onClick={handleClick}>
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
});
