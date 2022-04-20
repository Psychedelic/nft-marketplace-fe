import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  ActionButton,
  ModalInput,
  Completed,
  Pending,
} from '../core';
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
  ActionText,
} from './styles';

import { LISTING_STATUS_CODES } from '../../constants/listing';
import { useAppDispatch } from '../../store';
import { makeOffer } from '../../store/features/marketplace';

/* --------------------------------------------------------------------------
 * Make Offer Modal Component
 * --------------------------------------------------------------------------*/

export type MakeOfferModalProps = {
  onClose: () => void;
}

export const MakeOfferModal = ({ onClose }: MakeOfferModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // MakeOffer modal steps: listingInfo/submitted
  const [modalStep, setModalStep] = useState<string>(
    LISTING_STATUS_CODES.ListingInfo,
  );
  const [amount, setAmount] = useState<string>('');

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setAmount('');
    setModalStep(LISTING_STATUS_CODES.ListingInfo);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    onClose();
  };

  const handleSubmitOffer = async () => {
    if (!id) return;

    setModalStep(LISTING_STATUS_CODES.Pending);

    dispatch(
      makeOffer({
        id,
        amount,
        onSuccess: () => {
          setModalStep(LISTING_STATUS_CODES.Submitted);
        },
        onFailure: () => {
          setModalStep(LISTING_STATUS_CODES.ListingInfo);
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
        <ActionText onClick={() => {
          // eslint-disable-next-line no-console
          console.log('makeOffer modal opened');
        }}
        >
          {`${t('translation:nftCard.forOffer')}`}
        </ActionText>
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
        {modalStep === LISTING_STATUS_CODES.ListingInfo && (
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
                setValue={(value) => setAmount(value)}
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
                  handleClick={handleSubmitOffer}
                  disabled={!amount}
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
        {modalStep === LISTING_STATUS_CODES.Pending && (
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
            {/*
              ---------------------------------
              Pending Action Buttons
              ---------------------------------
            */}
            <ModalButtonsList>
              <ModalButtonWrapper fullWidth>
                <ActionButton
                  type="secondary"
                  text={t('translation:modals.buttons.cancel')}
                  handleClick={() => {
                    setModalStep(LISTING_STATUS_CODES.ListingInfo);
                  }}
                />
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
        {/*
          ---------------------------------
          Step: 3 -> submitted
          ---------------------------------
        */}
        {modalStep === LISTING_STATUS_CODES.Submitted && (
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
