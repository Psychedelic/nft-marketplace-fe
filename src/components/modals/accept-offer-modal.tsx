import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Completed } from '../core';
import infoLogo from '../../assets/info-icon.svg';
import crownsLogo from '../../assets/crowns-logo.svg';
import wicpIcon from '../../assets/wicpIcon.png';
import {
  AcceptOfferModalTrigger,
  ModalOverlay,
  ModalContent,
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  SaleContentWrapper,
  ItemDetailsWrapper,
  ItemDetails,
  ItemLogo,
  ItemName,
  PriceDetails,
  WICPContainer,
  WICPText,
  WICPLogo,
  PriceText,
  FeeContainer,
  FeeDetails,
  FeeLabelContainer,
  FeeLabel,
  InfoIcon,
  FeePercent,
  ModalButtonsList,
  ModalButtonWrapper,
} from './styles';

// TODO: Update accept offer modal with dynamic data

/* --------------------------------------------------------------------------
 * Accept Offer Modal Component
 * --------------------------------------------------------------------------*/

export const AcceptOfferModal = () => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Accept offer modal steps: offerInfo/accepted
  const [modalStep, setModalStep] = useState<string>('offerInfo');

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setModalStep('offerInfo');
  };

  const handleModalClose = () => {
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
        <AcceptOfferModalTrigger>
          <ActionButton
            type="outline"
            size="small"
            text={t('translation:buttons.action.acceptOffer')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('acceptOffer modal opened');
            }}
          />
        </AcceptOfferModalTrigger>
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
          Step: 1 -> offerInfo
          ---------------------------------
        */}
        {modalStep === 'offerInfo' && (
          <Container>
            {/*
              ---------------------------------
              Offer Header
              ---------------------------------
            */}
            <ModalHeader>
              <ModalTitle>
                {t('translation:modals.title.acceptOffer')}
              </ModalTitle>
              <ModalDescription>
                {t('translation:modals.description.acceptOffer')}
              </ModalDescription>
            </ModalHeader>
            {/*
              ---------------------------------
              Offer details
              ---------------------------------
            */}
            <SaleContentWrapper>
              <ItemDetailsWrapper>
                <ItemDetails>
                  <ItemLogo src={crownsLogo} alt="crowns" />
                  <ItemName>CAP Crowns #2713</ItemName>
                </ItemDetails>
                <PriceDetails>
                  <WICPContainer size="small">
                    <WICPLogo src={wicpIcon} alt="wicp" />
                    <WICPText size="small">5.12 WICP</WICPText>
                  </WICPContainer>
                  <PriceText>$221.93</PriceText>
                </PriceDetails>
              </ItemDetailsWrapper>
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
              <ItemDetailsWrapper lastChild>
                <ItemDetails>
                  <ItemName>
                    {t('translation:modals.labels.totalEarnings')}
                  </ItemName>
                </ItemDetails>
                <PriceDetails>
                  <WICPContainer size="large">
                    <WICPLogo
                      src={wicpIcon}
                      alt="wicp"
                      size="large"
                    />
                    <WICPText size="large">5.01 WICP</WICPText>
                  </WICPContainer>
                  <PriceText size="large">$202.12</PriceText>
                </PriceDetails>
              </ItemDetailsWrapper>
            </SaleContentWrapper>
            {/*
              ---------------------------------
              Offer Action Buttons
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
                  text={t('translation:modals.buttons.acceptOffer')}
                  handleClick={() => {
                    setModalStep('accepted');
                  }}
                />
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
        {/*
          ---------------------------------
          Step: 2 -> accepted
          ---------------------------------
        */}
        {modalStep === 'accepted' && (
          <Container>
            {/*
              ---------------------------------
              Accepted Header
              ---------------------------------
            */}
            <ModalHeader>
              <ModalTitle>
                {t('translation:modals.title.offerAccepted')}
              </ModalTitle>
              <ModalDescription>
                {t('translation:modals.description.offerAccepted')}
              </ModalDescription>
            </ModalHeader>
            {/*
              ---------------------------------
              Accepted details
              ---------------------------------
            */}
            <Completed />
            {/*
              ---------------------------------
              Accepted Action Buttons
              ---------------------------------
            */}
            <ModalButtonsList>
              <ModalButtonWrapper fullWidth>
                <ActionButton
                  type="primary"
                  text={t('translation:modals.buttons.done')}
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
