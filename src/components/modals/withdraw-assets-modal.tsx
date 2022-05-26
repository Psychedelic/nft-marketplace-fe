import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton } from '../core';
import wicpIcon from '../../assets/wicp.svg';
import {
  WithdrawModalTrigger,
  ModalContent,
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  SaleContentWrapper,
  ItemDetailsWrapper,
  ItemDetails,
  ItemStatus,
  ItemLogo,
  ItemName,
  ModalButtonsList,
  ModalButtonWrapper,
} from './styles';

import { ModalOverlay } from './modal-overlay';
import { ThemeRootElement } from '../../constants/common';
import { useSettingsStore } from '../../store';

/* --------------------------------------------------------------------------
 * Withdraw Assets Modal Component
 * --------------------------------------------------------------------------*/

export const WithdrawAssetsModal = () => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const { assetsToWithdraw } = useSettingsStore();

  const handleModalOpen = (modalOpenedStatus: boolean) => {
    setModalOpened(modalOpenedStatus);
  };

  const handleModalClose = () => {
    setModalOpened(false);
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
        <WithdrawModalTrigger>
          {t('translation:alerts.retryMessage')}
        </WithdrawModalTrigger>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal
        container={document.getElementById(ThemeRootElement)}
      >
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
        <ModalContent
          onInteractOutside={(event) => {
            event.preventDefault();
          }}
          onEscapeKeyDown={(event) => {
            event.preventDefault();
          }}
        >
          <Container>
            {/*
              ---------------------------------
              Header
              ---------------------------------
            */}
            <ModalHeader>
              <ModalTitle>
                {t('translation:modals.title.withdrawAssets')}
              </ModalTitle>
              <ModalDescription size="medium">
                {t('translation:modals.description.withdrawAssets')}
              </ModalDescription>
            </ModalHeader>
            {/*
              ---------------------------------
              Non Fungibles details
              ---------------------------------
            */}
            <SaleContentWrapper>
              {assetsToWithdraw?.map((asset) => (
                <ItemDetailsWrapper type="withdraw">
                  <ItemDetails>
                    <ItemLogo
                      src={wicpIcon}
                      alt="wicp"
                      withoutBorderRadius
                    />
                    <ItemName>{asset.amount} WICP</ItemName>
                  </ItemDetails>
                </ItemDetailsWrapper>
              ))}
            </SaleContentWrapper>
            {/*
              ---------------------------------
              Action Buttons
              ---------------------------------
            */}
            <ModalButtonsList>
              <ModalButtonWrapper>
                <ActionButton
                  type="secondary"
                  onClick={handleModalClose}
                >
                  {t('translation:modals.buttons.cancel')}
                </ActionButton>
              </ModalButtonWrapper>
              <ModalButtonWrapper>
                <ActionButton
                  type="primary"
                  onClick={handleModalClose}
                >
                  {t('translation:modals.buttons.retryAll')}
                </ActionButton>
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        </ModalContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
