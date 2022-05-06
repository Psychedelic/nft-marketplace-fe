import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { AppLog } from '../../utils/log';

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
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [modalStep, setModalStep] = useState<ListingStatusCodes>(
    ListingStatusCodes.ListingInfo,
  );

  const [amount, setAmount] = useState('');

  const tokenId = useMemo(() => id || nftTokenId, [id, nftTokenId]);

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
                <ActionButton type="primary" onClick={handleViewNFT}>
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
