import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Pending } from '../core';
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

import { ListingStatusCodes } from '../../constants/listing';
import {
  useAppDispatch,
  nftsActions,
  marketplaceActions,
} from '../../store';

/* --------------------------------------------------------------------------
 * Cancel Listing Modal Component
 * --------------------------------------------------------------------------*/

export const CancelListingModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Cancel listing modal steps: cancelList/pending
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.CancelList,
  );

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setModalStep(ListingStatusCodes.CancelList);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleCancelListing = async () => {
    if (!id) return;

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.cancelListing({
        id,
        onSuccess: () => {
          // TODO: Do not change the state manually,
          // if required query from the API and update the global state
          // as ultimately you DO NOT WANT to manage state, which is difficult
          // specially when you have two sources, the application state which
          // is somehow detached from the API state, which is the source
          dispatch(
            nftsActions.cancelNFTFromListing({
              id,
            }),
          );
          setModalOpened(false);
        },
        onFailure: () => {
          setModalStep(ListingStatusCodes.CancelList);
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
        {/*
          ---------------------------------
          Step: 1 -> cancelList
          ---------------------------------
        */}
        {modalStep === ListingStatusCodes.CancelList && (
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
    </DialogPrimitive.Root>
  );
};
