import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { SearchInput } from '../core';
import crownsLogo from '../../assets/crowns-logo.svg';
import wicpIcon from '../../assets/wicpIcon.png';
import {
  SearchModalTrigger,
  ModalOverlay,
  ModalContent,
  SearchContainer,
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

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
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
          />
        </SearchContainer>
        <ItemsListContainer>
          <ItemDetailsWrapper>
            <ItemDetails>
              <ItemLogo src={crownsLogo} alt="crowns" />
              <ItemName>CAP Crowns #2713</ItemName>
            </ItemDetails>
            <PriceDetails>
              <WICPContainer size="small">
                <WICPLogo src={wicpIcon} alt="wicp" />
                <WICPText size="small">5.12 WICP</WICPText>
              </WICPContainer>
              <PriceText>$221.93</PriceText>
            </PriceDetails>
          </ItemDetailsWrapper>
          <ItemDetailsWrapper>
            <ItemDetails>
              <ItemLogo src={crownsLogo} alt="crowns" />
              <ItemName>CAP Crowns #2713</ItemName>
            </ItemDetails>
            <PriceDetails>
              <WICPContainer size="small">
                <WICPLogo src={wicpIcon} alt="wicp" />
                <WICPText size="small">5.12 WICP</WICPText>
              </WICPContainer>
              <PriceText>$221.93</PriceText>
            </PriceDetails>
          </ItemDetailsWrapper>
        </ItemsListContainer>
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
