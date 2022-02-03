import React, { useState } from 'react';
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

/* --------------------------------------------------------------------------
 * Global Search Component
 * --------------------------------------------------------------------------*/

export const GlobalSearch = () => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setSearchText('');
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
          />
        </SearchContainer>
        {searchText && (
          <ItemsListContainer>
            {mockNFTList.map((nft) => (
              <ItemDetailsWrapper key={nft.id}>
                <ItemDetails>
                  <ItemLogo src={nft.logo} alt="crowns" />
                  <ItemName>{nft.name}</ItemName>
                </ItemDetails>
                <PriceDetails>
                  <WICPContainer size="small">
                    <WICPLogo src={wicpIcon} alt="wicp" />
                    <WICPText size="small">{nft.wicp}</WICPText>
                  </WICPContainer>
                  <PriceText>{nft.price}</PriceText>
                </PriceDetails>
              </ItemDetailsWrapper>
            ))}
          </ItemsListContainer>
        )}
        {!searchText && (
          <ItemsEmptyContainer>
            {t('translation:common.noRecentSearch')}
          </ItemsEmptyContainer>
        )}
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
