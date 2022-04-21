import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Pending, Completed } from '../core';
import { directBuy, getAllListings } from '../../store/features/marketplace';
import { useAppDispatch } from '../../store';
import { DIRECT_BUY_STATUS_CODES } from '../../constants/direct-buy';
import {
  BuyNowModalTrigger,
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
 * Buy Now Modal Component
 * --------------------------------------------------------------------------*/

export const BuyNowModal = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // BuyNow modal steps: pending/confirmed
  const [modalStep, setModalStep] = useState<string>('pending');

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleDirectBuy = () => {
    if (!id) {
      console.warn('Oops! Missing id param');

      return;
    }

    setModalStep(DIRECT_BUY_STATUS_CODES.Pending);

    dispatch(
      directBuy({
        tokenId: BigInt(id),
        onSuccess: () => {
          dispatch(getAllListings());
          setModalStep(DIRECT_BUY_STATUS_CODES.Confirmed);
        },
        onFailure: () => {
          // TODO: trigger step failure
        },
      }),
    );
  };

  return (
    <DialogPrimitive.Root open={modalOpened} onOpenChange={handleModalOpen}>
      {/*
        ---------------------------------
        Modal Trigger
        ---------------------------------
      */}
      <DialogPrimitive.Trigger asChild>
        <BuyNowModalTrigger>
          <ActionButton type="primary" text={t('translation:buttons.action.buyNow')} handleClick={handleDirectBuy} />
        </BuyNowModalTrigger>
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
          Step: 1 -> pending
          ---------------------------------
        */}
        {modalStep === 'pending' && (
          <Container>
            {/*
              ---------------------------------
              Pending Header
              ---------------------------------
            */}
            <ModalHeader>
              <ModalTitle>{t('translation:modals.title.pendingConfirmation')}</ModalTitle>
              <ModalDescription>{t('translation:modals.description.pendingConfirmation')}</ModalDescription>
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
                    setModalStep('listingInfo');
                  }}
                />
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
        {/*
          ---------------------------------
          Step: 2 -> confirmed
          ---------------------------------
        */}
        {modalStep === 'confirmed' && (
          <Container>
            {/*
              ---------------------------------
              Confirmed Header
              ---------------------------------
            */}
            <ModalHeader>
              <ModalTitle>{t('translation:modals.title.nftPurchased')}</ModalTitle>
              <ModalDescription>{t('translation:modals.description.nftPurchased')}</ModalDescription>
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

