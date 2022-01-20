import React from 'react';
import { useTranslation } from 'react-i18next';
import searchLogo from '../../../assets/searchIcon.svg';
import { Container, Input, SearchIcon } from './styles';

export const SearchInput = () => {
  const { t } = useTranslation();

  return (
    <Container name="searchInput">
      <SearchIcon src={searchLogo} alt="search" />
      <Input
        name="searchInput"
        placeholder={t('translation:inputField.placeholder.searchCollection')}
      />
    </Container>
  );
};
