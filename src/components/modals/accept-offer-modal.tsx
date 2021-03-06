import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Completed, Pending } from '../core';
import wicpIcon from '../../assets/wicp.svg';
import {
  AcceptOfferModalTrigger,
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
  FeePercent,
  ModalButtonsList,
  ModalButtonWrapper,
  InfoIcon,
  ItemTokenId,
} from './styles';

import { totalPriceCalculator } from '../../integrations/marketplace/price.utils';
import {
  useNFTSStore,
  useAppDispatch,
  nftsActions,
  marketplaceActions,
} from '../../store';
import { NFTMetadata } from '../../declarations/legacy';
import { ListingStatusCodes } from '../../constants/listing';
import { formatPriceValue } from '../../utils/formatters';
import { isTokenId } from '../../utils/nfts';
import { ModalOverlay } from './modal-overlay';
import { ThemeRootElement } from '../../constants/common';

export interface AcceptOfferProps {
  price: string;
  formattedPrice: string;
  offerFrom: string;
  nftTokenId?: string;
  actionButtonProp?: string;
  isMobileScreen?: boolean;
}

/* --------------------------------------------------------------------------
 * Accept Offer Modal Component
 * --------------------------------------------------------------------------*/

export const AcceptOfferModal = ({
  price,
  formattedPrice,
  offerFrom,
  nftTokenId,
  actionButtonProp,
  isMobileScreen,
}: AcceptOfferProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { loadedNFTS } = useNFTSStore();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Accept offer modal steps: offerInfo/pending/accepted
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.OfferInfo,
  );

  const tokenId = useMemo(() => nftTokenId || id, [nftTokenId, id]);

  const nftDetails: NFTMetadata | undefined = useMemo(
    () => loadedNFTS.find((nft) => nft.id === tokenId),
    [loadedNFTS, tokenId],
  );

  const handleModalOpen = (modalOpenedStatus: boolean) => {
    setModalOpened(modalOpenedStatus);
    setModalStep(ListingStatusCodes.OfferInfo);

    const isAccepted = modalStep === ListingStatusCodes.Accepted;

    if (modalOpenedStatus || !isTokenId(tokenId) || !isAccepted)
      return;

    // Update NFT owner details in store
    // on successful offer acceptance and closing the modal
    dispatch(
      nftsActions.acceptNFTOffer({
        id: tokenId as string,
        buyerId: offerFrom,
      }),
    );
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleAcceptOffer = async () => {
    if (!isTokenId(tokenId)) return;

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.acceptOffer({
        id: tokenId as string,
        buyerPrincipalId: offerFrom,
        offerPrice: price,
        onSuccess: () => {
          setModalStep(ListingStatusCodes.Accepted);
        },
        onFailure: () => {
          setModalStep(ListingStatusCodes.OfferInfo);
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
            fontWeight={actionButtonProp ? 'light' : undefined}
          >
            {t('translation:buttons.action.acceptOffer')}
          </ActionButton>
        </AcceptOfferModalTrigger>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal
        container={document.getElementById(ThemeRootElement)}
      >
        {/*
        ---------------------------------
        Modal Overlay
        ---------------------------------
      */}
        <ModalOverlay
          enableParticles={modalStep === ListingStatusCodes.Accepted}
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
          Step: 1 -> offerInfo
          ---------------------------------
        */}
          {modalStep === ListingStatusCodes.OfferInfo && (
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
                    {nftDetails?.preview && (
                      <ItemLogo
                        src={nftDetails?.preview}
                        alt="crowns"
                      />
                    )}
                    <ItemName>
                      {isMobileScreen
                        ? `CAP Crowns #${
                            nftTokenId ?? nftDetails?.id
                          }`
                        : 'CAP Crowns'}
                      <ItemTokenId>
                        {`#${nftTokenId ?? nftDetails?.id}`}
                      </ItemTokenId>
                    </ItemName>
                  </ItemDetails>
                  <PriceDetails>
                    <WICPContainer size="small">
                      <WICPLogo src={wicpIcon} alt="wicp" />
                      <WICPText size="small">{`${price} WICP`}</WICPText>
                    </WICPContainer>
                    <PriceText>{`$${formatPriceValue(
                      formattedPrice,
                    )}`}</PriceText>
                  </PriceDetails>
                </ItemDetailsWrapper>
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
                        {t('translation:modals.labels.collectionFee')}
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
                      <WICPText size="large">{`${formatPriceValue(
                        totalEarningsInWICP.toString(),
                      )} WICP`}</WICPText>
                    </WICPContainer>
                    <PriceText size="large">{`$${formatPriceValue(
                      totalEarningsInDollars.toString(),
                    )}`}</PriceText>
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
                    type="primary"
                    onClick={handleAcceptOffer}
                  >
                    {t('translation:modals.buttons.acceptOffer')}
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
            </Container>
          )}
          {/*
          ---------------------------------
          Step: 3 -> accepted
          ---------------------------------
        */}
          {modalStep === ListingStatusCodes.Accepted && (
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
                    onClick={() => handleModalOpen(false)}
                  >
                    {t('translation:modals.buttons.done')}
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
