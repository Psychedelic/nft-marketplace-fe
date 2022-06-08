import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Pending, Completed } from '../core';
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
  ItemLogo,
  ItemName,
  ModalButtonsList,
  ModalButtonWrapper,
} from './styles';

import { ModalOverlay } from './modal-overlay';
import { ThemeRootElement } from '../../constants/common';
import {
  useSettingsStore,
  useAppDispatch,
  marketplaceActions,
} from '../../store';
import { ListingStatusCodes } from '../../constants/listing';
import { AppLog } from '../../utils/log';

/* --------------------------------------------------------------------------
 * Withdraw Assets Modal Component
 * --------------------------------------------------------------------------*/

export const WithdrawAssetsModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Withdraw Assets modal steps: withdrawInfo/pending/completed
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.WithdrawInfo,
  );

  const { assetsToWithdraw } = useSettingsStore();

  const handleModalOpen = (modalOpenedStatus: boolean) => {
    setModalOpened(modalOpenedStatus);
    setModalStep(ListingStatusCodes.WithdrawInfo);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleWithdrawAssets = async () => {
    if (
      !assetsToWithdraw.length ||
      !assetsToWithdraw[0].principalId
    ) {
      AppLog.warn('Oops! Missing principalId to withdraw');

      return;
    }

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.withdrawFungible({
        principalId: assetsToWithdraw[0].principalId,
        onSuccess: () => {
          setModalStep(ListingStatusCodes.Completed);
        },
        onFailure: () => {
          setModalStep(ListingStatusCodes.WithdrawInfo);
        },
      }),
    );
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
          {/*
          ---------------------------------
          Step: 1 -> Assets to withdraw
          ---------------------------------
        */}
          {modalStep === ListingStatusCodes.WithdrawInfo && (
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
                    onClick={handleWithdrawAssets}
                  >
                    {t('translation:modals.buttons.withdraw')}
                  </ActionButton>
                </ModalButtonWrapper>
              </ModalButtonsList>
            </Container>
          )}
          {/*
          ---------------------------------
          Step: 2 -> pending
          ---------------------------------
        */}
          {modalStep === ListingStatusCodes.Pending && (
            <Container>
              {/*
            ---------------------------------
            Pending Header
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
            Pending details
            ---------------------------------
          */}
              <Pending />
            </Container>
          )}
          {/*
          ---------------------------------
          Step: 3 -> completed
          ---------------------------------
        */}
          {modalStep === ListingStatusCodes.Completed && (
            <Container>
              {/*
              ---------------------------------
              Confirmed Header
              ---------------------------------
            */}
              <ModalHeader>
                <ModalTitle>
                  {t('translation:modals.title.withdrawalSuccess')}
                </ModalTitle>
              </ModalHeader>
              {/*
              ---------------------------------
              Confirmed details
              ---------------------------------
            */}
              <Completed />
              {/*
              ---------------------------------
              Confirmed Action Buttons
              ---------------------------------
            */}
              <ModalButtonsList>
                <ModalButtonWrapper fullWidth>
                  <ActionButton
                    type="secondary"
                    onClick={handleModalClose}
                  >
                    {t('translation:modals.buttons.close')}
                  </ActionButton>
                </ModalButtonWrapper>
              </ModalButtonsList>
            </Container>
          )}
        </ModalContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
