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

import { ListingStatusCodes } from '../../constants/listing';
import { useAppDispatch, marketplaceActions } from '../../store';

/* --------------------------------------------------------------------------
 * Make Offer Modal Component
 * --------------------------------------------------------------------------*/

export type MakeOfferModalProps = {
  onClose?: () => void;
  actionText?: string;
  nftTokenId?: string;
};

export const MakeOfferModal = ({
  onClose,
  actionText,
  nftTokenId,
}: MakeOfferModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // MakeOffer modal steps: listingInfo/submitted
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.ListingInfo,
  );
  const [amount, setAmount] = useState<string>('');

  const tokenId: string | undefined = (() => {
    const tid = id ?? nftTokenId;

    if (!tid) return;

    // eslint-disable-next-line consistent-return
    return tid;
  })();

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setAmount('');
    setModalStep(ListingStatusCodes.ListingInfo);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    // eslint-disable-next-line
    onClose && onClose();
  };

  const handleSubmitOffer = async () => {
    if (!tokenId) {
      console.warn('Oops! Missing NFT id param');

      return;
    }

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.makeOffer({
        id: tokenId,
        amount,
        onSuccess: () => {
          setModalStep(ListingStatusCodes.Submitted);
        },
        onFailure: () => {
          setModalStep(ListingStatusCodes.ListingInfo);
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
        {actionText ? (
          <ActionText>{actionText}</ActionText>
        ) : (
          <MakeOfferModalTrigger>
            <ActionButton type="primary">
              {t('translation:buttons.action.makeOffer')}
            </ActionButton>
          </MakeOfferModalTrigger>
        )}
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
        {modalStep === ListingStatusCodes.ListingInfo && (
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
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
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
                  onChange={handleModalClose}
                >
                  {t('translation:modals.buttons.cancel')}
                </ActionButton>
              </ModalButtonWrapper>
              <ModalButtonWrapper>
                <ActionButton
                  type="primary"
                  onChange={handleSubmitOffer}
                  disabled={!amount}
                >
                  {t('translation:modals.buttons.submitOffer')}
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
                  onClick={() => {
                    setModalStep(ListingStatusCodes.ListingInfo);
                  }}
                >
                  {t('translation:buttons.action.makeOffer')}
                </ActionButton>
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
        {/*
          ---------------------------------
          Step: 3 -> submitted
          ---------------------------------
        */}
        {modalStep === ListingStatusCodes.Submitted && (
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
                  onClick={handleModalClose}
                >
                  {t('translation:modals.buttons.viewNFT')}
                </ActionButton>
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
