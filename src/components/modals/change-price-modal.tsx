import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  ActionButton,
  ModalInput,
  Pending,
  Completed,
} from '../core';
import infoLogo from '../../assets/info-icon.svg';
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
  InfoIcon,
  FeePercent,
  ModalButtonsList,
  ModalButtonWrapper,
} from './styles';

import { LISTING_STATUS_CODES } from '../../constants/listing';
import { useNFTSStore } from '../../store';
import { NFTMetadata } from '../../declarations/nft';

/* --------------------------------------------------------------------------
 * Edit Listing Modal Component
 * --------------------------------------------------------------------------*/

export const ChangePriceModal = () => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // ChangePrice modal steps: listingInfo/pending/confirmed
  const [modalStep, setModalStep] = useState<string>(
    LISTING_STATUS_CODES.ListingInfo,
  );
  const [amount, setAmount] = useState<string>('');

  const { loadedNFTS } = useNFTSStore();
  const { id } = useParams();

  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === id),
    [loadedNFTS, id],
  );

  useEffect(() => {
    if (!nftDetails?.price || !modalOpened) return;

    setAmount(nftDetails.price);
  }, [nftDetails, modalOpened]);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setModalStep(LISTING_STATUS_CODES.ListingInfo);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  useEffect(() => {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    let timer: any;
    if (modalStep === LISTING_STATUS_CODES.Pending) {
      timer = setTimeout(() => {
        setModalStep(LISTING_STATUS_CODES.Confirmed);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [modalStep]);

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
          <ActionButton
            type="primary"
            text={t('translation:buttons.action.editListing')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('editListing modal opened');
            }}
          />
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
        {modalStep === LISTING_STATUS_CODES.ListingInfo && (
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
                setValue={(value) => setAmount(value)}
                defaultValue={amount}
              />
              <FeeContainer>
                <FeeDetails>
                  <FeeLabelContainer>
                    <FeeLabel>
                      {t('translation:modals.labels.listingFee')}
                    </FeeLabel>
                    <InfoIcon src={infoLogo} alt="info" />
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
                    <InfoIcon src={infoLogo} alt="info" />
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
                  text={t('translation:modals.buttons.cancel')}
                  handleClick={handleModalClose}
                />
              </ModalButtonWrapper>
              <ModalButtonWrapper>
                <ActionButton
                  type="primary"
                  text={t(
                    'translation:modals.buttons.completeListing',
                  )}
                  handleClick={() => {
                    setModalStep(LISTING_STATUS_CODES.Pending);
                  }}
                  disabled={!amount}
                />
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
        {/*
          ---------------------------------
          Step: 2 -> pending
          ---------------------------------
        */}
        {modalStep === LISTING_STATUS_CODES.Pending && (
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
                  text={t('translation:modals.buttons.cancel')}
                  handleClick={() => {
                    setModalStep(LISTING_STATUS_CODES.ListingInfo);
                  }}
                />
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
        {/*
          ---------------------------------
          Step: 3 -> confirmed
          ---------------------------------
        */}
        {modalStep === LISTING_STATUS_CODES.Confirmed && (
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
                <ActionButton
                  type="primary"
                  text={t('translation:modals.buttons.viewListing')}
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
