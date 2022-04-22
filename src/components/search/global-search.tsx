import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { SearchInput } from '../core';
import wicpIcon from '../../assets/wicpIcon.png';
import { mockNFTList } from './mock-data';
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
} from './styles';
import { useNFTSStore } from '../../store';

/* --------------------------------------------------------------------------
 * Global Search Component
 * --------------------------------------------------------------------------*/

export const GlobalSearch = () => {
  const { t } = useTranslation();
  const { loadedNFTS } = useNFTSStore();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setSearchText('');
  };

  const handleSearch = (value: any) => {
    const searchResultData = loadedNFTS.filter((nfts) => nfts.id.includes(value));
    setSearchResult(searchResultData);
  };

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
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('click callback');
            }}
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
        {searchText && (searchResult.length ? (
          <ItemsListContainer>
            {searchResult?.slice(0, 5).map((nft) => (
              <RouterLink to={`/nft/${nft.id}`} onClick={() => handleModalOpen(false)}>
                <ItemDetailsWrapper key={nft.id}>
                  <ItemDetails>
                    <ItemLogo src={nft.preview} alt="crowns" />
                    <ItemName>{`${nft.name} ${nft.id}`}</ItemName>
                  </ItemDetails>
                  <PriceDetails>
                    <WICPContainer size="small">
                      <WICPLogo src={wicpIcon} alt="wicp" />
                      <WICPText size="small">
                        {nft.price ? nft.price : '- '}
                        WICP
                      </WICPText>
                    </WICPContainer>
                    <PriceText>
                      $
                      {`${nft.price ? nft.price : ' -'}`}
                    </PriceText>
                  </PriceDetails>
                </ItemDetailsWrapper>
              </RouterLink>
            ))}
          </ItemsListContainer>
        ) : (
          <ItemsEmptyContainer>
            No NFT found with that ID
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
