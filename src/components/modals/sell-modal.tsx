import { useState } from 'react';
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
  FeePercent,
  ModalButtonsList,
  ModalButtonWrapper,
  ActionText,
  InfoIcon,
} from './styles';

import { ListingStatusCodes } from '../../constants/listing';
import {
  useAppDispatch,
  nftsActions,
  marketplaceActions,
} from '../../store';
import { AppLog } from '../../utils/log';

/* --------------------------------------------------------------------------
 * Sell Modal Component
 * --------------------------------------------------------------------------*/

export type SellModalProps = {
  onClose?: () => void;
  actionText?: string;
  nftTokenId?: string;
};

export const SellModal = ({
  onClose,
  actionText,
  nftTokenId,
}: SellModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Sell modal steps: listingInfo/pending/confirmed
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.ListingInfo,
  );
  const [amount, setAmount] = useState<string>('');

  const tokenId: string | undefined = (() => {
    const tid = id ?? nftTokenId;

    if (!tid) return;

    // eslint-disable-next-line consistent-return
    return tid;
  })();

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setAmount('');
    setModalStep(ListingStatusCodes.ListingInfo);

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
    if (!tokenId) {
      AppLog.warn('Oops! Missing NFT id param');

      return;
    }

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.makeListing({
        id: tokenId,
        amount,
        onSuccess: () => {
          // TODO: update the app state after listing
          // should pull from the API
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
      <DialogPrimitive.Trigger asChild>
        {actionText ? (
          <ActionText>{actionText}</ActionText>
        ) : (
          <SellModalTrigger>
            <ActionButton type="primary">
              {t('translation:buttons.action.sell')}
            </ActionButton>
          </SellModalTrigger>
        )}
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
