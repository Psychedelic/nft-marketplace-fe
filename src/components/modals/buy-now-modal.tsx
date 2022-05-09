import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Pending, Completed } from '../core';
import { useAppDispatch, marketplaceActions } from '../../store';
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
import { AppLog } from '../../utils/log';
import { DirectBuyStatusCodes } from '../../constants/direct-buy';

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
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<DirectBuyStatusCodes>(
    DirectBuyStatusCodes.Pending,
  );

  const tokenId = useMemo(() => {
    const tid = Number(id ?? actionTextId);

    if (!tid && tid !== 0) {
      return;
    }

    return BigInt(tid);
  }, [id, actionTextId]);

  const handleModalOpen = (status: boolean) => {
    setModalStep(DirectBuyStatusCodes.Pending);
    setModalOpened(status);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    if (onClose) onClose();
  };

  const handleDirectBuy = () => {
    if (
      typeof tokenId === 'undefined' ||
      (!tokenId && Number(tokenId) !== 0)
    ) {
      AppLog.warn('Oops! Missing id param');

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
          setModalOpened(false);
        },
      }),
    );
  };

  const handleViewNFT = () => {
    navigate(`/nft/${id}`, { replace: true });
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
        {modalStep === DirectBuyStatusCodes.Pending && (
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
          Step: 2 -> confirmed
          ---------------------------------
        */}
        {modalStep === DirectBuyStatusCodes.Confirmed && (
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
                <ActionButton type="primary" onChange={handleViewNFT}>
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
