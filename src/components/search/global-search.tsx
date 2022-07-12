import React, { useState, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { SearchInput } from '../core';
import {
  SearchModalTrigger,
  ModalOverlay,
  ModalContent,
  SearchContainer,
  SearchResultsWrapper,
  CloseIcon,
  MobileSearchBar,
} from './styles';
import {
  filterActions,
  useAppDispatch,
  useFilterStore,
  useNFTSStore,
} from '../../store';
import SearchResults from './search-results';

const DEBOUNCE_TIMEOUT_MS = 400;

/* --------------------------------------------------------------------------
 * Global Search Component
 * --------------------------------------------------------------------------*/

type GlobalSearchTypes = {
  startAnimation?: boolean;
  isMobileScreen?: boolean;
};

export const GlobalSearch = ({
  startAnimation,
  isMobileScreen,
}: GlobalSearchTypes) => {
  const { t } = useTranslation();
  const { loadedNFTS } = useNFTSStore();
  const dispatch = useAppDispatch();
  const { sortBy } = useFilterStore();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const [currentAbortController, setCurrentAbortController] =
    useState<AbortController>();

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setSearchText('');
  };

  const debouncedSearchHandler = useCallback(
    debounce((value: string, abortController: AbortController) => {
      dispatch(
        filterActions.getSearchResults({
          sort: sortBy,
          order: 'd',
          page: 0,
          count: 25,
          search: value,
          abortController,
        }),
      );
    }, DEBOUNCE_TIMEOUT_MS),
    [loadedNFTS],
  );

  const handleSearch = (value: string) => {
    if (!value) {
      dispatch(filterActions.setSearchResults([]));
      return;
    }

    // Abort any pending request before proceeding
    if (currentAbortController) currentAbortController.abort();

    const abortController = new AbortController();

    setCurrentAbortController(abortController);

    debouncedSearchHandler(value, abortController);
  };

  const closeDropDown = () => handleModalOpen(false);

  if (isMobileScreen) {
    return (
      <MobileSearchBar>
        <SearchModalTrigger startAnimation={startAnimation}>
          <SearchInput
            placeholder={t(
              'translation:inputField.placeholder.searchCollection',
            )}
            setValue={(value) => {
              setSearchText(value);
            }}
            value={searchText}
            handleSearch={handleSearch}
            isMobileScreen={isMobileScreen}
          />
          {Boolean(searchText.length) && (
            <CloseIcon
              icon="close"
              size="lg"
              isMobileScreen={isMobileScreen}
              onClick={() => setSearchText('')}
            />
          )}
        </SearchModalTrigger>
        {searchText && (
          <SearchResultsWrapper>
            <SearchResults
              searchText={searchText}
              closeDropDown={closeDropDown}
            />
          </SearchResultsWrapper>
        )}
      </MobileSearchBar>
    );
  }
  return (
    <DialogPrimitive.Root
      open={modalOpened}
      onOpenChange={handleModalOpen}
    >
      {/*
        ---------------------------------
        Modal Trigger
        ---------------------------------
      */}
      <DialogPrimitive.Trigger asChild>
        <SearchModalTrigger startAnimation={startAnimation}>
          <SearchInput
            placeholder={t(
              'translation:inputField.placeholder.searchCollection',
            )}
          />
        </SearchModalTrigger>
      </DialogPrimitive.Trigger>
      {/*
        ---------------------------------
        Modal Overlay
        ---------------------------------
      */}
      <ModalOverlay />
      {/*
        ---------------------------------
        Modal Content
        ---------------------------------
      */}
      <ModalContent>
        <SearchContainer>
          <SearchInput
            placeholder={t(
              'translation:inputField.placeholder.searchCollection',
            )}
            setValue={(value) => setSearchText(value)}
            handleSearch={handleSearch}
            isMobileScreen={isMobileScreen}
          />
        </SearchContainer>
        <SearchResults
          searchText={searchText}
          closeDropDown={closeDropDown}
        />
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
