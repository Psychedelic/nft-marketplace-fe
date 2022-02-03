import React from 'react';
import { useTranslation } from 'react-i18next';
import { SearchInput } from '../core';
import { SearchModalTrigger } from './styles';

/* --------------------------------------------------------------------------
 * Global Search Component
 * --------------------------------------------------------------------------*/

export const GlobalSearch = () => {
  const { t } = useTranslation();

  return (
    <SearchModalTrigger>
      <SearchInput
        placeholder={t(
          'translation:inputField.placeholder.searchCollection',
        )}
        handleClick={() => {
          // eslint-disable-next-line no-console
          console.log('click callback');
        }}
      />
    </SearchModalTrigger>
  );
};
