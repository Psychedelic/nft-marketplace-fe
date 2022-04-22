import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, ModalInput, Pending, Completed } from '../core';
import infoLogo from '../../assets/info-icon.svg';
import {
  SellModalTrigger,
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
import { useAppDispatch, nftsActions } from '../../store';
import { makeListing, getAllListings } from '../../store/features/marketplace';

/* --------------------------------------------------------------------------
 * Sell Modal Component
 * --------------------------------------------------------------------------*/

export const SellModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Sell modal steps: listingInfo/pending/confirmed
  const [modalStep, setModalStep] = useState<string>(LISTING_STATUS_CODES.ListingInfo);
  const [amount, setAmount] = useState<string>('');

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setAmount('');
    setModalStep(LISTING_STATUS_CODES.ListingInfo);

    const notConfirmed = modalStep !== LISTING_STATUS_CODES.Confirmed;

    if (status || !id || notConfirmed) return;

    // TODO: This seems to need to be triggered
    // in the onSuccess of makeListing
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

    setModalStep(LISTING_STATUS_CODES.Pending);

    dispatch(
      makeListing({
        id,
        amount,
        onSuccess: () => {
          dispatch(getAllListings());
          setModalStep(LISTING_STATUS_CODES.Confirmed);
        },
        onFailure: () => {
          setModalStep(LISTING_STATUS_CODES.ListingInfo);
        },
      }),
    );
  };

  return (
    <DialogPrimitive.Root open={modalOpened} onOpenChange={handleModalOpen}>
      {/*
        ---------------------------------
        Modal Trigger
        ---------------------------------
      */}
      <DialogPrimitive.Trigger asChild>
        <SellModalTrigger>
          <ActionButton
            type="primary"
            text={t('translation:buttons.action.sell')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('Sell modal opened');
            }}
          />
        </SellModalTrigger>
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
              <ModalTitle>{t('translation:modals.title.makeListing')}</ModalTitle>
              <ModalDescription>{t('translation:modals.description.makeListing')}</ModalDescription>
            </ModalHeader>
            {/*
              ---------------------------------
              Listing input details
              ---------------------------------
            */}
            <SaleContentWrapper>
              <ModalInput
                placeholder={t('translation:inputField.placeholder.amount')}
                setValue={(value) => setAmount(value)}
              />
              <FeeContainer>
                <FeeDetails>
                  <FeeLabelContainer>
                    <FeeLabel>{t('translation:modals.labels.listingFee')}</FeeLabel>
                    <InfoIcon src={infoLogo} alt="info" />
                  </FeeLabelContainer>
                  <FeePercent>{t('translation:modals.labels.listingFeePercent')}</FeePercent>
                </FeeDetails>
                <FeeDetails>
                  <FeeLabelContainer>
                    <FeeLabel>{t('translation:modals.labels.creatorRoyalityFee')}</FeeLabel>
                    <InfoIcon src={infoLogo} alt="info" />
                  </FeeLabelContainer>
                  <FeePercent>{t('translation:modals.labels.creatorRoyalityFeePercent')}</FeePercent>
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
                  text={t('translation:modals.buttons.completeListing')}
                  handleClick={handleListing}
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
              <ModalTitle>{t('translation:modals.title.pendingConfirmation')}</ModalTitle>
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
              <ModalTitle>{t('translation:modals.title.listingComplete')}</ModalTitle>
              <ModalDescription>{t('translation:modals.description.listingComplete')}</ModalDescription>
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
                  handleClick={() => handleModalOpen(false)}
                />
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
      </ModalContent>
    </DialogPrimitive.Root>
  );
};

