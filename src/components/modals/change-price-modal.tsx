import React, { useState, useEffect, useMemo } from 'react';
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
  ChangePriceModalTrigger,
  ModalContent,
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  SaleContentWrapper,
  FeeContainer,
  FeeDetails,
  FeeLabelContainer,
  FeeLabel,
  FeePercent,
  ModalButtonsList,
  ModalButtonWrapper,
  InfoIcon,
  ActionText,
} from './styles';

import { ListingStatusCodes } from '../../constants/listing';
import {
  useNFTSStore,
  useAppDispatch,
  nftsActions,
  marketplaceActions,
} from '../../store';
import { NFTMetadata } from '../../declarations/legacy';
import { parseE8SAmountToWICP } from '../../utils/formatters';
import { AppLog } from '../../utils/log';
import { isTokenId } from '../../utils/nfts';
import { ModalOverlay } from './modal-overlay';
import { ThemeRootElement } from '../../constants/common';

/* --------------------------------------------------------------------------
 * Change Price Modal Component
 * --------------------------------------------------------------------------*/

export type ChangePriceModalProps = {
  onClose?: () => void;
  actionText?: string;
  nftTokenId?: string;
  nftPrice?: bigint;
  isTriggerVisible?: boolean;
};

export const ChangePriceModal = ({
  onClose,
  actionText,
  nftTokenId,
  nftPrice,
  isTriggerVisible,
}: ChangePriceModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { loadedNFTS } = useNFTSStore();
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // ChangePrice modal steps: listingInfo/pending/confirmed
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.ListingInfo,
  );
  const [amount, setAmount] = useState<string>('');

  const tokenId = useMemo(() => id || nftTokenId, [id, nftTokenId]);

  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === id),
    [loadedNFTS, id],
  );

  const tokenPrice = useMemo(
    () =>
      (nftDetails?.price && BigInt(nftDetails?.price)) || nftPrice,
    [nftDetails, nftPrice],
  );

  useEffect(() => {
    if (!tokenPrice || !modalOpened) return;

    setAmount(parseE8SAmountToWICP(tokenPrice));
  }, [nftDetails, modalOpened]);

  const handleModalOpen = (modalOpenedStatus: boolean) => {
    setModalOpened(modalOpenedStatus);
    setAmount('');
    setModalStep(ListingStatusCodes.ListingInfo);

    const isConfirmed = modalStep === ListingStatusCodes.Confirmed;

    if (modalOpenedStatus || !id || !isConfirmed) return;

    // TODO: Instead, call the API to get the latest price
    // from the API state, should not mutate the state in the app
    // as this should be sync with the backend so updating the
    // state of the FE APP from the sync is preferred
    // Update NFT listed for sale in store
    // on successful listing and closing the modal
    dispatch(
      nftsActions.setNFTForSale({
        id,
        amount,
      }),
    );
  };

  const handleModalClose = () => {
    setModalOpened(false);
    if (onClose) onClose();
  };

  const handleListing = async () => {
    if (!isTokenId(tokenId)) {
      AppLog.warn('Oops! Missing NFT id param');

      return;
    }

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.makeListing({
        id: tokenId as string,
        amount,
        onSuccess: () => {
          // TODO: should the app state change / update
          // after a new make listing
          // dispatch(getAllListings());
          setModalStep(ListingStatusCodes.Confirmed);
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
            <ChangePriceModalTrigger>
              <ActionButton type="primary">
                {t('translation:buttons.action.changePrice')}
              </ActionButton>
            </ChangePriceModalTrigger>
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
          enableParticles={modalStep === ListingStatusCodes.Confirmed}
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
                  {t('translation:modals.title.changePrice')}
                </ModalTitle>
                <ModalDescription>
                  {t('translation:modals.description.changePrice')}
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
                <FeeContainer>
                  <FeeDetails>
                    <FeeLabelContainer>
                      <FeeLabel>
                        {t('translation:modals.labels.listingFee')}
                      </FeeLabel>
                      <InfoIcon icon="info" />
                    </FeeLabelContainer>
                    <FeePercent>
                      {t(
                        'translation:modals.labels.listingFeePercent',
                      )}
                    </FeePercent>
                  </FeeDetails>
                  <FeeDetails>
                    <FeeLabelContainer>
                      <FeeLabel>
                        {t(
                          'translation:modals.labels.creatorRoyalityFee',
                        )}
                      </FeeLabel>
                      <InfoIcon icon="info" />
                    </FeeLabelContainer>
                    <FeePercent>
                      {t(
                        'translation:modals.labels.creatorRoyalityFeePercent',
                      )}
                    </FeePercent>
                  </FeeDetails>
                </FeeContainer>
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
                    onClick={handleListing}
                    disabled={!amount}
                  >
                    {t('translation:modals.buttons.completeListing')}
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
          Step: 3 -> confirmed
          ---------------------------------
        */}
          {modalStep === ListingStatusCodes.Confirmed && (
            <Container>
              {/*
              ---------------------------------
              Confirmed Header
              ---------------------------------
            */}
              <ModalHeader>
                <ModalTitle>
                  {t('translation:modals.title.listingComplete')}
                </ModalTitle>
                <ModalDescription>
                  {t(
                    'translation:modals.description.listingComplete',
                  )}
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
                    {t('translation:modals.buttons.viewListing')}
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
