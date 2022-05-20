import { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  ActionButton,
  ModalInput,
  Pending,
  Completed,
} from '../core';
import {
  MakeOfferModalTrigger,
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
import { ModalOverlay } from './modal-overlay';

import { ListingStatusCodes } from '../../constants/listing';
import { useAppDispatch, marketplaceActions } from '../../store';
import { AppLog } from '../../utils/log';
import { parseE8SAmountToWICP } from '../../utils/formatters';

/* --------------------------------------------------------------------------
 * Make Offer Modal Component
 * --------------------------------------------------------------------------*/

export type MakeOfferModalProps = {
  onClose?: () => void;
  actionText?: string;
  nftTokenId?: string;
  isOfferEditing?: boolean;
  offerPrice?: bigint;
  isNFTListed?: boolean;
  isTriggerVisible?: boolean;
};

export const MakeOfferModal = ({
  onClose,
  actionText,
  nftTokenId,
  isOfferEditing,
  offerPrice,
  isNFTListed,
  isTriggerVisible,
}: MakeOfferModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<ListingStatusCodes>(
    ListingStatusCodes.ListingInfo,
  );

  const [amount, setAmount] = useState('');

  const tokenId = useMemo(() => id || nftTokenId, [id, nftTokenId]);

  useEffect(() => {
    if (!offerPrice || !modalOpened) return;

    setAmount(parseE8SAmountToWICP(offerPrice));
  }, [offerPrice, modalOpened]);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setAmount('');
    setModalStep(ListingStatusCodes.ListingInfo);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    if (onClose) onClose();
  };

  const handleSubmitOffer = async () => {
    if (!tokenId) {
      AppLog.warn('Oops! Missing NFT id param');

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

  const handleViewNFT = () => {
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
            <ActionText>{actionText}</ActionText>
          ) : (
            <MakeOfferModalTrigger>
              <ActionButton
                type={isNFTListed ? 'outline' : 'primary'}
              >
                {isOfferEditing
                  ? t('translation:buttons.action.editOffer')
                  : t('translation:buttons.action.makeOffer')}
              </ActionButton>
            </MakeOfferModalTrigger>
          )}
        </DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        {/*
        ---------------------------------
        Modal Overlay
        ---------------------------------
      */}
        <ModalOverlay
          enableParticles={modalStep === ListingStatusCodes.Submitted}
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
                  {isOfferEditing
                    ? t('translation:modals.title.editOffer')
                    : t('translation:modals.title.makeAnOffer')}
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
                    onClick={handleModalClose}
                  >
                    {t('translation:modals.buttons.cancel')}
                  </ActionButton>
                </ModalButtonWrapper>
                <ModalButtonWrapper>
                  <ActionButton
                    type="primary"
                    onClick={handleSubmitOffer}
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
