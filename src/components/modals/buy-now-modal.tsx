import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Pending, Completed } from '../core';
import { useAppDispatch, marketplaceActions } from '../../store';
import {
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
import { isTokenId } from '../../utils/nfts';
import { DirectBuyStatusCodes } from '../../constants/direct-buy';
import { ModalOverlay } from './modal-overlay';
import { ThemeRootElement } from '../../constants/common';

/* --------------------------------------------------------------------------
 * Buy Now Modal Component
 * --------------------------------------------------------------------------*/

export type BuyNowModalProps = {
  onClose?: () => void;
  actionText?: string;
  actionTextId?: number;
  price?: string;
  isTriggerVisible?: boolean;
};

export const BuyNowModal = ({
  onClose,
  actionText,
  actionTextId,
  price = '',
  isTriggerVisible,
}: BuyNowModalProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
    if (!isTokenId(tokenId)) {
      AppLog.warn('Oops! Missing id param');

      return;
    }

    setModalStep(DirectBuyStatusCodes.Pending);

    dispatch(
      marketplaceActions.directBuy({
        tokenId: tokenId as bigint,
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
    // TODO: The tokenId is already declared at the top
    // and its not determined by the location.pathname
    // but instead id preceeds actionTextId
    // so maybe decide which logic is valid and reuse for both cases
    // unless there's a reason why for this
    const tokenId = location.pathname === '/' ? actionTextId : id;
    navigate(`/nft/${tokenId}`, { replace: true });
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
      {isTriggerVisible && (
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
      )}
      <DialogPrimitive.Portal
        container={document.getElementById(ThemeRootElement)}
      >
        {/*
        ---------------------------------
        Modal Overlay
        ---------------------------------
      */}
        <ModalOverlay
          enableParticles={
            modalStep === DirectBuyStatusCodes.Confirmed
          }
        />
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
                  <ActionButton
                    type="primary"
                    onClick={handleViewNFT}
                  >
                    {t('translation:modals.buttons.viewNFT')}
                  </ActionButton>
                </ModalButtonWrapper>
              </ModalButtonsList>
            </Container>
          )}
        </ModalContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
