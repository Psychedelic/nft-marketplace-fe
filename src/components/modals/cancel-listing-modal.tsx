import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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

import { LISTING_STATUS_CODES } from '../../constants/listing';
import { useAppDispatch, nftsActions } from '../../store';
import { cancelListingBySeller } from '../../store/features/marketplace';

/* --------------------------------------------------------------------------
 * Cancel Listing Modal Component
 * --------------------------------------------------------------------------*/

export const CancelListingModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleCancelListing = async () => {
    if (!id) return;

    dispatch(
      cancelListingBySeller({
        id,
        onSuccess: () => {
          dispatch(
            nftsActions.cancelNFTFromListing({
              id,
            }),
          );
        },
        onFailure: () => {
          console.log('failed');
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
                handleClick={handleCancelListing}
                danger
              />
            </ModalButtonWrapper>
          </ModalButtonsList>
        </Container>
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
