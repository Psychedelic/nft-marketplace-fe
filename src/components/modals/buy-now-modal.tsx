import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Pending, Completed } from '../core';
import { directBuy, getAllListings } from '../../store/features/marketplace';
import { useAppDispatch } from '../../store';
import { DIRECT_BUY_STATUS_CODES } from '../../constants/direct-buy';
import {
  ModalOverlay,
  ModalContent,
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalButtonsList,
  ModalButtonWrapper,
  ActionText,
  BuyNowModalTrigger,
} from './styles';

/* --------------------------------------------------------------------------
 * Buy Now Modal Component
 * --------------------------------------------------------------------------*/

export type BuyNowModalProps = {
  onClose?: () => void;
  actionText?: string;
  actionTextId?: number;
}

export const BuyNowModal = ({ onClose, actionText, actionTextId } : BuyNowModalProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // BuyNow modal steps: pending/confirmed
  const [modalStep, setModalStep] = useState<string>('pending');

  const tokenId: bigint | undefined = (() => {
    const tid = id ?? actionTextId;

    if (!tid) return;

    // eslint-disable-next-line consistent-return
    return BigInt(tid);
  })();

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    // eslint-disable-next-line
    onClose && onClose();
  };

  const handleDirectBuy = () => {
    console.log('[debug] handleDirectBuy', {
      actionTextId,
      id,
    });

    if (!tokenId) {
      console.warn('Oops! Missing id param');

      return;
    }

    setModalStep(DIRECT_BUY_STATUS_CODES.Pending);

    dispatch(
      directBuy({
        tokenId,
        onSuccess: () => {
          // TODO: the get all listings is used to get data from the canister
          // as the current kyasshu version does not provide the price data
          // on makelisting, etc, so we use this as a fallback
          // although not scalable, if persists might add an endpoint for
          // a single item instead of a list...
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
        {actionText ? (
          <ActionText onClick={handleDirectBuy}>
            {actionText}
          </ActionText>
        ) : (
          <BuyNowModalTrigger>
            <ActionButton type="primary" text={t('translation:buttons.action.buyNow')} handleClick={handleDirectBuy} />
          </BuyNowModalTrigger>
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
