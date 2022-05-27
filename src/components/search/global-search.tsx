import React, { useState, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import throttle from 'lodash.throttle';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { SearchInput } from '../core';
import wicpIcon from '../../assets/wicp.svg';
import {
  SearchModalTrigger,
  ModalOverlay,
  ModalContent,
  SearchContainer,
  ItemsEmptyContainer,
  ItemsListContainer,
  ItemDetailsWrapper,
  ItemDetails,
  ItemLogo,
  ItemName,
  PriceDetails,
  WICPContainer,
  WICPText,
  WICPLogo,
  PriceText,
  SubText,
} from './styles';
import {
  filterActions,
  useAppDispatch,
  useFilterStore,
  useNFTSStore,
} from '../../store';
import { formatPriceValue } from '../../utils/formatters';

/* --------------------------------------------------------------------------
 * Global Search Component
 * --------------------------------------------------------------------------*/

export const GlobalSearch = () => {
  const { t } = useTranslation();
  const { loadedNFTS } = useNFTSStore();
  const dispatch = useAppDispatch();
  const { sortBy, searchResults } = useFilterStore();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setSearchText('');
  };

  const handleSearch = useCallback(
    throttle((value: string) => {
      if (!value) {
        dispatch(filterActions.setSearchResults([]));
        return;
      }

      dispatch(
        filterActions.getSearchResults({
          sort: sortBy,
          order: 'd',
          page: 0,
          count: 25,
          search: value,
        }),
      );
    }, 2500),
    [loadedNFTS],
  );

  const closeDropDown = () => handleModalOpen(false);

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
        <SearchModalTrigger>
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
          />
        </SearchContainer>
        {searchText &&
          (searchResults.length ? (
            <ItemsListContainer>
              {searchResults?.map((nft) => (
                <RouterLink
                  to={`/nft/${nft.id}`}
                  onClick={closeDropDown}
                  key={nft.id}
                >
                  <ItemDetailsWrapper>
                    <ItemDetails>
                      <ItemLogo src={nft.preview} alt="crowns" />
                      <ItemName>{`${nft.name} ${nft.id}`}</ItemName>
                    </ItemDetails>
                    <PriceDetails>
                      {Boolean(nft?.wicpPrice) && (
                        <WICPContainer size="small">
                          <WICPLogo src={wicpIcon} alt="wicp" />
                          <WICPText size="small">
                            {nft.wicpPrice}
                            WICP
                          </WICPText>
                        </WICPContainer>
                      )}
                      {Boolean(nft?.price) && (
                        <PriceText>
                          <SubText>$</SubText>
                          <SubText>{`${formatPriceValue(
                            nft.price.toString(),
                          )}`}</SubText>
                        </PriceText>
                      )}
                    </PriceDetails>
                  </ItemDetailsWrapper>
                </RouterLink>
              ))}
            </ItemsListContainer>
          ) : (
            <ItemsEmptyContainer>
              {t('translation:emptyStates.noNFTId')}
            </ItemsEmptyContainer>
          ))}
        {!searchText && (
          <ItemsEmptyContainer>
            {t('translation:common.noRecentSearch')}
          </ItemsEmptyContainer>
        )}
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
