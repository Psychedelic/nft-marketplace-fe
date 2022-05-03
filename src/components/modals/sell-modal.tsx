import { useState } from 'react';
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
  ActionText,
} from './styles';

import { ListingStatusCodes } from '../../constants/listing';
import { useAppDispatch, nftsActions } from '../../store';
import { makeListing } from '../../store/features/marketplace';

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
      console.warn('Oops! Missing NFT id param');

      return;
    }

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      makeListing({
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
          <ActionText
            onClick={() => console.log('sell modal opened')}
          >
            {actionText}
          </ActionText>
        ) : (
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
                setValue={(value) => setAmount(value)}
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
                  text={t('translation:modals.buttons.cancel')}
                  handleClick={() => {
                    setModalStep(ListingStatusCodes.ListingInfo);
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
