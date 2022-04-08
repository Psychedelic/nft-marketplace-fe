import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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

import { totalPriceCalculator } from '../../integrations/marketplace/price.utils';
import { useNFTSStore } from '../../store';
import { NFTMetadata } from '../../declarations/nft';

export interface AcceptOfferProps {
  price: string;
  formattedPrice: string;
}

/* --------------------------------------------------------------------------
 * Accept Offer Modal Component
 * --------------------------------------------------------------------------*/

export const AcceptOfferModal = ({
  price,
  formattedPrice,
}: AcceptOfferProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { loadedNFTS } = useNFTSStore();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Accept offer modal steps: offerInfo/accepted
  const [modalStep, setModalStep] = useState<string>('offerInfo');

  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === id),
    [loadedNFTS, id],
  );

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setModalStep('offerInfo');
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const totalEarningsInWICP = totalPriceCalculator({
    price,
    feesInPercent: 5,
  });

  const totalEarningsInDollars = totalPriceCalculator({
    price: formattedPrice,
    feesInPercent: 5,
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
                  <ItemLogo src={nftDetails?.preview} alt="crowns" />
                  <ItemName>{`CAP Crowns #${nftDetails?.id}`}</ItemName>
                </ItemDetails>
                <PriceDetails>
                  <WICPContainer size="small">
                    <WICPLogo src={wicpIcon} alt="wicp" />
                    <WICPText size="small">{`${price} WICP`}</WICPText>
                  </WICPContainer>
                  <PriceText>{`$${formattedPrice}`}</PriceText>
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
                    <WICPText size="large">{`${totalEarningsInWICP} WICP`}</WICPText>
                  </WICPContainer>
                  <PriceText size="large">{`$${totalEarningsInDollars}`}</PriceText>
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
