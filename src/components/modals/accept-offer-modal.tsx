import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Completed, Pending } from '../core';
import infoLogo from '../../assets/info-icon.svg';
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
import {
  useNFTSStore,
  useAppDispatch,
  nftsActions,
} from '../../store';
import { NFTMetadata } from '../../declarations/nft';
import { acceptOffer } from '../../store/features/marketplace';
import { LISTING_STATUS_CODES } from '../../constants/listing';

export interface AcceptOfferProps {
  price: string;
  formattedPrice: string;
  offerFrom: string;
  nftTokenId?: string;
}

/* --------------------------------------------------------------------------
 * Accept Offer Modal Component
 * --------------------------------------------------------------------------*/

export const AcceptOfferModal = ({
  price,
  formattedPrice,
  offerFrom,
  nftTokenId,
}: AcceptOfferProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { loadedNFTS } = useNFTSStore();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Accept offer modal steps: offerInfo/pending/accepted
  const [modalStep, setModalStep] = useState<string>(
    LISTING_STATUS_CODES.OfferInfo,
  );

  const tokenId: string | undefined = (() => {
    const tid = nftTokenId ?? id;

    if (!tid) return;

    // eslint-disable-next-line consistent-return
    return tid;
  })();

  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === tokenId),
    [loadedNFTS, tokenId],
  );

  const handleModalOpen = (modalOpenedStatus: boolean) => {
    setModalOpened(modalOpenedStatus);
    setModalStep(LISTING_STATUS_CODES.OfferInfo);

    const isAccepted = modalStep === LISTING_STATUS_CODES.Accepted;

    if (modalOpenedStatus || !tokenId || !isAccepted) return;

    // Update NFT owner details in store
    // on successful offer acceptance and closing the modal
    dispatch(
      nftsActions.acceptNFTOffer({
        id: tokenId,
        buyerId: offerFrom,
      }),
    );
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleAcceptOffer = async () => {
    if (!tokenId) return;

    setModalStep(LISTING_STATUS_CODES.Pending);

    dispatch(
      acceptOffer({
        id: tokenId,
        buyerPrincipalId: offerFrom,
        onSuccess: () => {
          setModalStep(LISTING_STATUS_CODES.Accepted);
        },
        onFailure: () => {
          setModalStep(LISTING_STATUS_CODES.OfferInfo);
        },
      }),
    );
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
        {modalStep === LISTING_STATUS_CODES.OfferInfo && (
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
                  {nftDetails?.preview && <ItemLogo src={nftDetails?.preview} alt="crowns" />}
                  <ItemName>{`CAP Crowns #${nftTokenId ?? nftDetails?.id}`}</ItemName>
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
                  handleClick={handleAcceptOffer}
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
                    setModalStep(LISTING_STATUS_CODES.OfferInfo);
                  }}
                />
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        )}
        {/*
          ---------------------------------
          Step: 3 -> accepted
          ---------------------------------
        */}
        {modalStep === LISTING_STATUS_CODES.Accepted && (
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
