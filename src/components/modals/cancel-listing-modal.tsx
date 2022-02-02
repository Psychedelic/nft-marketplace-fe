import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton } from '../core';
import {
  CancelListingModalTrigger,
  ModalOverlay,
  ModalContent,
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalButtonsList,
  ModalButtonWrapper,
} from './styles';

/* --------------------------------------------------------------------------
 * Cancel Listing Modal Component
 * --------------------------------------------------------------------------*/

export const CancelListingModal = () => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
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
        <CancelListingModalTrigger>
          <ActionButton
            type="secondary"
            text={t('translation:buttons.action.cancelListing')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('cancelListing modal opened');
            }}
          />
        </CancelListingModalTrigger>
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
        <Container>
          {/*
            ---------------------------------
            Listing Header
            ---------------------------------
          */}
          <ModalHeader>
            <ModalTitle>
              {t('translation:modals.title.cancelListing')}
            </ModalTitle>
            <ModalDescription>
              {t('translation:modals.description.cancelListing')}
            </ModalDescription>
          </ModalHeader>
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
                text={t('translation:modals.buttons.cancelListing')}
                handleClick={handleModalClose}
                danger
              />
            </ModalButtonWrapper>
          </ModalButtonsList>
        </Container>
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
