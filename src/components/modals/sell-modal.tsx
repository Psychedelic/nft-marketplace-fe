import { useState, useMemo } from 'react';
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
  SellModalTrigger,
  ModalContent,
  SellModalPreviewWrapper,
  SellModalPreviewContainer,
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
  ActionText,
  InfoIcon,
  NFTCardPreview,
  NFTPreviewText,
  ActionTextWrapper,
  TransactionStepsContainer,
} from './styles';

import { ListingStatusCodes } from '../../constants/listing';
import {
  useAppDispatch,
  nftsActions,
  marketplaceActions,
  usePlugStore,
  useNFTSStore,
  RootState,
} from '../../store';
import { AppLog } from '../../utils/log';
import { isNFTOwner } from '../../integrations/kyasshu/utils';
import { NFTMetadata } from '../../declarations/legacy';
import { ModalOverlay } from './modal-overlay';
import { ThemeRootElement } from '../../constants/common';
import { TransactionStep } from './steps/transaction-step';
import { findTransactionStatus } from '../../utils/common';

/* --------------------------------------------------------------------------
 * Sell Modal Component
 * --------------------------------------------------------------------------*/

export type SellModalProps = {
  onClose?: () => void;
  actionText?: string;
  nftTokenId?: string;
  isTriggerVisible?: boolean;
};

export const SellModal = ({
  onClose,
  actionText,
  nftTokenId,
  isTriggerVisible,
}: SellModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id, collectionId } = useParams();
  const navigate = useNavigate();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();
  const { loadedNFTS } = useNFTSStore();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Sell modal steps: listingInfo/pending/confirmed
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.ListingInfo,
  );
  const [amount, setAmount] = useState<string>('');

  const transactionSteps = useSelector(
    (state: RootState) => state.marketplace.transactionSteps,
  );

  const tokenId: string | undefined = (() => {
    const tid = id ?? nftTokenId;

    if (!tid) return;

    // eslint-disable-next-line consistent-return
    return tid;
  })();

  const nftDetails: NFTMetadata | undefined = useMemo(() => {
    const details = loadedNFTS.find((nft) => nft.id === tokenId);

    return details;
  }, [loadedNFTS, tokenId]);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setAmount('');
    setModalStep(ListingStatusCodes.ListingInfo);
    dispatch(marketplaceActions.setTransactionStepsToDefault());

    const notConfirmed = modalStep !== ListingStatusCodes.Confirmed;

    if (status || !id || notConfirmed) return;

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
    // eslint-disable-next-line
    onClose && onClose();
  };

  const handleListing = async () => {
    if (!tokenId || !collectionId) {
      AppLog.warn('Oops! Missing NFT/Collection id param');

      return;
    }

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.makeListing({
        id: tokenId,
        amount,
        collectionId,
        onSuccess: () => {
          // TODO: update the app state after listing
          // should pull from the API
          // dispatch(getAllListings());
          setModalStep(ListingStatusCodes.Confirmed);

          if (!id) return;

          // Update NFT listed for sale in store
          // on successful listing and closing the modal
          dispatch(
            nftsActions.setNFTForSale({
              id: tokenId,
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
    if (id) {
      navigate(`/${collectionId}/nft/${tokenId}`, { replace: true });
    } else {
      navigate(`/${collectionId}/nft/${tokenId}`);
    }
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
            <SellModalTrigger>
              <ActionButton type="primary">
                {t('translation:buttons.action.sell')}
              </ActionButton>
            </SellModalTrigger>
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
                    {t('translation:modals.title.makeListing')}
                  </ModalTitle>
                  <ModalDescription>
                    {t('translation:modals.description.makeListing')}
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
