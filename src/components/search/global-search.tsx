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
  nftsActions,
  RootState,
  useAppDispatch,
  useNFTSStore,
} from '../../store';
import SearchResults from './search-results';
import { useSelector } from 'react-redux';

const DEBOUNCE_TIMEOUT_MS = 400;

/* --------------------------------------------------------------------------
 * Global Search Component
 * --------------------------------------------------------------------------*/

type GlobalSearchTypes = {
  startAnimation?: boolean;
  isMobileScreen?: boolean;
  revertMobileNavAnimation?: () => void;
};

export const GlobalSearch = ({
  startAnimation,
  isMobileScreen,
  revertMobileNavAnimation,
}: GlobalSearchTypes) => {
  const { t } = useTranslation();
  const { loadedNFTS } = useNFTSStore();
  const dispatch = useAppDispatch();
  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );
  const isHomePage = location.pathname === '/';
  const placeholderText = !isHomePage
    ? t('translation:inputField.placeholder.searchAll')
    : t('translation:inputField.placeholder.searchCollection');

  const { collectionId } = collectionDetails;

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const [currentAbortController, setCurrentAbortController] =
    useState<AbortController>();

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setSearchText('');
  };

  // TODO: Are the dependencies for this correct?
  const debouncedSearchHandler = useCallback(
    debounce((value: string, abortController: AbortController) => {
      dispatch(
        nftsActions.getSearchResults({
          count: 25,
          search: value,
          abortController,
          collectionId,
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

  const closeDropDown = () => {
    handleModalOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    revertMobileNavAnimation && revertMobileNavAnimation();
  };

  if (isMobileScreen) {
    return (
      <MobileSearchBar>
        <SearchModalTrigger startAnimation={startAnimation}>
          <SearchInput
            placeholder={placeholderText}
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
          <SearchInput placeholder={placeholderText} />
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
            placeholder={placeholderText}
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
