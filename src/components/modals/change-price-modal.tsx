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
  ModalOverlay,
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

/* --------------------------------------------------------------------------
 * Edit Listing Modal Component
 * --------------------------------------------------------------------------*/

export const ChangePriceModal = () => {
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

  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === id),
    [loadedNFTS, id],
  );

  useEffect(() => {
    if (!nftDetails?.price || !modalOpened) return;

    setAmount(parseE8SAmountToWICP(BigInt(nftDetails.price)));
  }, [nftDetails, modalOpened]);

  const handleModalOpen = (modalOpenedStatus: boolean) => {
    setModalOpened(modalOpenedStatus);
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
  };

  const handleListing = async () => {
    if (!id) return;

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.makeListing({
        id,
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
        <ChangePriceModalTrigger>
          <ActionButton type="primary">
            {t('translation:buttons.action.editListing')}
          </ActionButton>
        </ChangePriceModalTrigger>
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
                {t('translation:modals.title.editListing')}
              </ModalTitle>
              <ModalDescription>
                {t('translation:modals.description.editListing')}
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
                    {t('translation:modals.labels.listingFeePercent')}
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
                  {t('translation:modals.buttons.cancel')}
                </ActionButton>
              </ModalButtonWrapper>
            </ModalButtonsList>
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
                {t('translation:modals.description.listingComplete')}
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
                <ActionButton type="primary" onClick={handleViewNFT}>
                  {t('translation:modals.buttons.viewListing')}
                </ActionButton>
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
