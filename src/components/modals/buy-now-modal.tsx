import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Pending, Completed } from '../core';
import { useAppDispatch, marketplaceActions } from '../../store';
import { DirectBuyStatusCodes } from '../../constants/direct-buy';
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
  price?: string;
};

export const BuyNowModal = ({
  onClose,
  actionText,
  actionTextId,
  price = '',
}: BuyNowModalProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // BuyNow modal steps: pending/confirmed
  const [modalStep, setModalStep] = useState<string>('pending');

  const tokenId: bigint | undefined = (() => {
    const tid = Number(id ?? actionTextId);

    if (!tid && tid !== 0) {
      return;
    }

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
    if (
      typeof tokenId === 'undefined' ||
      (!tokenId && Number(tokenId) !== 0)
    ) {
      console.warn('Oops! Missing id param');

      return;
    }

    setModalStep(DirectBuyStatusCodes.Pending);

    dispatch(
      marketplaceActions.directBuy({
        tokenId,
        price,
        onSuccess: () => {
          // TODO: the get all listings is used to get data from the canister
          // as the current kyasshu version does not provide the price data
          // on makelisting, etc, so we use this as a fallback
          // although not scalable, if persists might add an endpoint for
          // a single item instead of a list...
          // dispatch(getAllListings());
          setModalStep(DirectBuyStatusCodes.Confirmed);
        },
        onFailure: () => {
          // TODO: trigger step failure
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
          <ActionText onClick={handleDirectBuy}>
            {actionText}
          </ActionText>
        ) : (
          <BuyNowModalTrigger>
            <ActionButton type="primary" onClick={handleDirectBuy}>
              {t('translation:buttons.action.buyNow')}
            </ActionButton>
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
                    setModalStep('listingInfo');
                  }}
                >
                  {t('translation:modals.buttons.cancel')}
                </ActionButton>
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
              <ModalTitle>
                {t('translation:modals.title.nftPurchased')}
              </ModalTitle>
              <ModalDescription>
                {t('translation:modals.description.nftPurchased')}
              </ModalDescription>
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
                  onChange={handleModalClose}
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
