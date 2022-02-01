import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, ModalInput, Completed } from '../core';
import {
  MakeOfferModalTrigger,
  ModalOverlay,
  ModalContent,
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  SaleContentWrapper,
  ModalButtonsList,
  ModalButtonWrapper,
} from './styles';

/* --------------------------------------------------------------------------
 * Make Offer Modal Component
 * --------------------------------------------------------------------------*/

export const MakeOfferModal = () => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // MakeOffer modal steps: listingInfo/submitted
  const [modalStep, setModalStep] = useState<string>('listingInfo');

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setModalStep('listingInfo');
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
        <MakeOfferModalTrigger>
          <ActionButton
            type="secondary"
            text={t('translation:buttons.action.makeOffer')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('makeOffer modal opened');
            }}
          />
        </MakeOfferModalTrigger>
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
        {/*
          ---------------------------------
          Step: 1 -> listingInfo
          ---------------------------------
        */}
        {modalStep === 'listingInfo' && (
          <Container>
            {/*
              ---------------------------------
              Listing Header
              ---------------------------------
            */}
            <ModalHeader>
              <ModalTitle>
                {t('translation:modals.title.makeAnOffer')}
              </ModalTitle>
              <ModalDescription>
                {t('translation:modals.description.makeAnOffer')}
              </ModalDescription>
            </ModalHeader>
            {/*
              ---------------------------------
              Listing input details
              ---------------------------------
            */}
            <SaleContentWrapper>
              <ModalInput
                placeholder={t(
                  'translation:inputField.placeholder.amount',
                )}
              />
            </SaleContentWrapper>
            {/*
              ---------------------------------
              Listing Action Buttons
              ---------------------------------
            */}
            <ModalButtonsList>
              <ModalButtonWrapper>
                <ActionButton
                  type="secondary"
                  text={t('translation:modals.buttons.cancel')}
                  handleClick={handleModalClose}
                />
              </ModalButtonWrapper>
              <ModalButtonWrapper>
                <ActionButton
                  type="primary"
                  text={t('translation:modals.buttons.submitOffer')}
                  handleClick={() => {
                    setModalStep('submitted');
                  }}
                />
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
        {/*
          ---------------------------------
          Step: 2 -> submitted
          ---------------------------------
        */}
        {modalStep === 'submitted' && (
          <Container>
            {/*
              ---------------------------------
              Submitted Header
              ---------------------------------
            */}
            <ModalHeader>
              <ModalTitle>
                {t('translation:modals.title.offerSubmitted')}
              </ModalTitle>
              <ModalDescription>
                {t('translation:modals.description.offerSubmitted')}
              </ModalDescription>
            </ModalHeader>
            {/*
              ---------------------------------
              Submitted details
              ---------------------------------
            */}
            <Completed />
            {/*
              ---------------------------------
              Submitted Action Buttons
              ---------------------------------
            */}
            <ModalButtonsList>
              <ModalButtonWrapper fullWidth>
                <ActionButton
                  type="primary"
                  text={t('translation:modals.buttons.viewNFT')}
                  handleClick={handleModalClose}
                />
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
