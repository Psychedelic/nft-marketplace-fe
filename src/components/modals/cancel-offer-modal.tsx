import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Pending } from '../core';
import { marketplaceActions, useAppDispatch } from '../../store';
import { OfferItem } from '../../declarations/legacy';
import {
  CancelOfferModalTrigger,
  ModalContent,
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalButtonsList,
  ModalButtonWrapper,
} from './styles';
import { ModalOverlay } from './modal-overlay';

import { ListingStatusCodes } from '../../constants/listing';
import { ThemeRootElement } from '../../constants/common';
import useMediaQuery from '../../hooks/use-media-query';

/* --------------------------------------------------------------------------
 * Cancel Offer Modal Component
 * --------------------------------------------------------------------------*/

export type CancelOfferModalProps = {
  item: OfferItem;
  largeTriggerButton?: boolean;
  actionText?: string;
};

export const CancelOfferModal = ({
  item,
  largeTriggerButton = false,
}: CancelOfferModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { collectionId } = useParams();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Cancel offer modal steps: cancelOffer/pending
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.CancelOffer,
  );

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setModalStep(ListingStatusCodes.CancelOffer);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleCancelOffer = () => {
    if (!item?.tokenId || !collectionId) return;

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.cancelOffer({
        id: item?.tokenId.toString(),
        collectionId: collectionId,
        onSuccess: () => {
          setModalOpened(false);

          console.log('TODO: handleCancelOffer: onSuccess');
        },
        onFailure: () => {
          setModalStep(ListingStatusCodes.CancelOffer);

          console.log('TODO: handleCancelOffer: onFailure');
        },
      }),
    );
  };

  const isMobileScreen = useMediaQuery('(max-width: 640px)');

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
        <CancelOfferModalTrigger largeButton={largeTriggerButton}>
          <ActionButton
            type="secondary"
            size="small"
            fontWeight={largeTriggerButton ? undefined : 'light'}
          >
            {largeTriggerButton
              ? t('translation:buttons.action.cancelOffer')
              : t('translation:buttons.action.cancel')}
          </ActionButton>
        </CancelOfferModalTrigger>
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
          Step: 1 -> cancelOffer
          ---------------------------------
        */}
          {modalStep === ListingStatusCodes.CancelOffer && (
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
                    type={isMobileScreen ? 'danger' : 'primary'}
                    onClick={handleCancelOffer}
                    danger
                  >
                    {t('translation:modals.buttons.cancelOffer')}
                  </ActionButton>
                </ModalButtonWrapper>
                <ModalButtonWrapper>
                  <ActionButton
                    type="secondary"
                    onClick={handleModalClose}
                  >
                    {t('translation:modals.buttons.cancel')}
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
                  {t('translation:modals.title.pendingConfirmation')}
                </ModalTitle>
                <ModalDescription>
                  {t(
                    'translation:modals.description.pendingConfirmation',
                  )}
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
        </ModalContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
