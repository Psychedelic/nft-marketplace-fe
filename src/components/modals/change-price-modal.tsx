import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  ActionButton,
  ModalInput,
  Completed,
  NftCard,
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
  NFTCardPreview,
  NFTPreviewText,
  SellModalPreviewWrapper,
  SellModalPreviewContainer,
  ActionTextWrapper,
  TransactionStepsContainer,
} from './styles';

import { ListingStatusCodes } from '../../constants/listing';
import {
  useNFTSStore,
  useAppDispatch,
  nftsActions,
  marketplaceActions,
  usePlugStore,
  RootState,
} from '../../store';
import { NFTMetadata } from '../../declarations/legacy';
import { parseE8SAmountToWICP } from '../../utils/formatters';
import { AppLog } from '../../utils/log';
import { isTokenId } from '../../utils/nfts';
import { ModalOverlay } from './modal-overlay';
import { ThemeRootElement } from '../../constants/common';
import { isNFTOwner } from '../../integrations/kyasshu/utils';
import { TransactionStep } from './steps/transaction-step';
import { findTransactionStatus } from '../../utils/common';

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
  const { id, collectionId } = useParams();
  const { loadedNFTS } = useNFTSStore();
  const navigate = useNavigate();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // ChangePrice modal steps: listingInfo/pending/confirmed
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.ListingInfo,
  );
  const [amount, setAmount] = useState<string>('');

  const transactionSteps = useSelector(
    (state: RootState) => state.marketplace.transactionSteps,
  );

  const tokenId = useMemo(() => id || nftTokenId, [id, nftTokenId]);

  const nftDetails: NFTMetadata | undefined = useMemo(() => {
    const details = loadedNFTS.find((nft) => nft.id === tokenId);

    return details;
  }, [loadedNFTS, tokenId]);

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
    if (!isTokenId(tokenId) || !collectionId) {
      AppLog.warn('Oops! Missing NFT/Collection id param');

      return;
    }

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.makeListing({
        id: tokenId as string,
        amount,
        collectionId,
        onSuccess: () => {
          // TODO: should the app state change / update
          // after a new make listing
          // dispatch(getAllListings());
          setModalStep(ListingStatusCodes.Confirmed);
          // Update NFT listed for sale in store
          // on successful listing and closing the modal
          dispatch(
            nftsActions.setNFTForSale({
              id: tokenId as string,
              amount,
            }),
          );
        },
        onFailure: () => {
          setModalStep(ListingStatusCodes.ListingInfo);
        },
      }),
    );
  };

  const handleViewNFT = () => {
    navigate(`/${collectionId}/nft/${tokenId}`, { replace: true });
    setModalOpened(false);
  };

  const myNFTIds = useSelector(
    (state: RootState) => state.nfts.myNFTIds,
  );

  const isOwner = isNFTOwner({
    isConnected,
    myNFTIds,
    currentNFTId: tokenId,
  });

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
            <ActionTextWrapper>
              <ActionText>{actionText}</ActionText>
            </ActionTextWrapper>
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
            <SellModalPreviewWrapper>
              <SellModalPreviewContainer>
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
                          {t('translation:modals.labels.protocolFee')}
                        </FeeLabel>
                        <InfoIcon icon="info" />
                      </FeeLabelContainer>
                      <FeePercent>
                        {t(
                          'translation:modals.labels.protocolFeePercent',
                        )}
                      </FeePercent>
                    </FeeDetails>
                    <FeeDetails>
                      <FeeLabelContainer>
                        <FeeLabel>
                          {t(
                            'translation:modals.labels.collectionFee',
                          )}
                        </FeeLabel>
                        <InfoIcon icon="info" />
                      </FeeLabelContainer>
                      <FeePercent>
                        {t(
                          'translation:modals.labels.collectionFeePercent',
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
                      type="primary"
                      onClick={handleListing}
                      disabled={!amount || Number(amount) <= 0}
                    >
                      {t(
                        'translation:modals.buttons.completeListing',
                      )}
                    </ActionButton>
                  </ModalButtonWrapper>
                  <ModalButtonWrapper>
                    <ActionButton
                      type="secondary"
                      onClick={handleModalClose}
                    >
                      {t('translation:modals.buttons.cancel')}
                    </ActionButton>
                  </ModalButtonWrapper>
                </ModalButtonsList>
              </SellModalPreviewContainer>
              <NFTCardPreview>
                <NFTPreviewText>
                  {t('translation:modals.labels.preview')}
                </NFTPreviewText>
                <NftCard
                  data={nftDetails}
                  owned={isOwner}
                  previewCardAmount={amount}
                  previewCard
                />
              </NFTCardPreview>
            </SellModalPreviewWrapper>
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
              <TransactionStepsContainer>
                {transactionSteps?.approveWICPStatus && (
                  <TransactionStep
                    name="Approving WICP"
                    status={findTransactionStatus(
                      transactionSteps.approveWICPStatus,
                    )}
                    iconName="check"
                    nextStepAvailable
                  />
                )}
                {transactionSteps?.listingStatus && (
                  <TransactionStep
                    name="Listing"
                    status={findTransactionStatus(
                      transactionSteps?.listingStatus,
                    )}
                    iconName="list"
                  />
                )}
              </TransactionStepsContainer>
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
                  {t('translation:modals.title.changePriceComplete')}
                </ModalTitle>
                <ModalDescription>
                  {t(
                    'translation:modals.description.changePriceComplete',
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
