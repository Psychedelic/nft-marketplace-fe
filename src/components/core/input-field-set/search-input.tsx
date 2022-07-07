import React, { forwardRef, ChangeEvent } from 'react';
import useMediaQuery from '../../../hooks/use-media-query';
import { Container, Input, SearchIcon } from './styles';

export type SearchInputProps = {
  placeholder?: string;
  setValue?: (value: string) => void;
  handleClick?: () => void;
  handleSearch?: (value: string) => void;
  openMobileSearchbar?: boolean;
};

export const SearchInput = forwardRef<
  HTMLInputElement,
  SearchInputProps
>(
  (
    {
      placeholder = '',
      setValue,
      handleClick,
      handleSearch,
      openMobileSearchbar,
    },
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
    const isMobileScreen = useMediaQuery('(max-width: 850px)');

    return (
      <Container name="searchInput" onClick={handleClick}>
        <SearchIcon icon="search" isMobileScreen={isMobileScreen} />
        <Input
          ref={ref}
          name="searchInput"
          type="text"
          placeholder={placeholder}
          onChange={handleValueChange}
          openMobileSearchbar={openMobileSearchbar}
        />
      </Container>
    );
  },
);
