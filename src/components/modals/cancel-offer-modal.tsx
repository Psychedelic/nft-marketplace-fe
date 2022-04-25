import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton } from '../core';
import {
  CancelOfferModalTrigger,
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
 * Cancel Offer Modal Component
 * --------------------------------------------------------------------------*/

export const CancelOfferModal = () => {
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
        <CancelOfferModalTrigger>
          <ActionButton
            type="secondary"
            size="small"
            text={t('translation:buttons.action.cancelOffer')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('cancelOffer modal opened');
            }}
          />
        </CancelOfferModalTrigger>
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
            Offer Header
            ---------------------------------
          */}
          <ModalHeader>
            <ModalTitle>
              {t('translation:modals.title.cancelOffer')}
            </ModalTitle>
            <ModalDescription>
              {t('translation:modals.description.cancelOffer')}
            </ModalDescription>
          </ModalHeader>
          {/*
            ---------------------------------
            Offer Action Buttons
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
                text={t('translation:modals.buttons.cancelOffer')}
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
