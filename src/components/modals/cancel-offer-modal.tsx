import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, Pending } from '../core';
import {
  marketplaceActions,
  RootState,
  useAppDispatch,
} from '../../store';
import { OfferItem } from '../../declarations/legacy';
import {
  CancelOfferModalTrigger,
  ModalOverlay,
  ModalContent,
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalButtonsList,
  ModalButtonWrapper,
} from './styles';

import { ListingStatusCodes } from '../../constants/listing';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

/* --------------------------------------------------------------------------
 * Cancel Offer Modal Component
 * --------------------------------------------------------------------------*/

export type CancelOfferModalProps = {
  setHasUserMadeOffer?: (value: boolean) => void;
  size?: string;
  item: OfferItem;
};

export const CancelOfferModal = ({
  item,
  setHasUserMadeOffer,
  size,
}: CancelOfferModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const routeID = useParams();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  // Cancel offer modal steps: cancelOffer/pending
  const [modalStep, setModalStep] = useState<string>(
    ListingStatusCodes.CancelOffer,
  );

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
    setModalStep(ListingStatusCodes.CancelOffer);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const recentlyMadeOffers = useSelector(
    (state: RootState) => state.marketplace.recentlyMadeOffers,
  );

  const handleCancelOffer = () => {
    const test = recentlyMadeOffers.find(
      (offer: any) => offer.id === routeID.id,
    );
    
    if (!item) {
      console.log(test, recentlyMadeOffers);
      dispatch(
        marketplaceActions.cancelOffer({
          id: test?.id.toString(),
          onSuccess: () => {
            setModalOpened(false);
            setHasUserMadeOffer && setHasUserMadeOffer(false);

            console.log('TODO: handleCancelOffer: onSuccess');
          },
          onFailure: () => {
            setModalStep(ListingStatusCodes.CancelOffer);

            console.log('TODO: handleCancelOffer: onFailure');
          },
        }),
      );
    }

    if (!item?.tokenId) return;

    setModalStep(ListingStatusCodes.Pending);

    dispatch(
      marketplaceActions.cancelOffer({
        id: item?.tokenId.toString(),
        onSuccess: () => {
          setModalOpened(false);
          setHasUserMadeOffer && setHasUserMadeOffer(false);

          console.log('TODO: handleCancelOffer: onSuccess');
        },
        onFailure: () => {
          setModalStep(ListingStatusCodes.CancelOffer);

          console.log('TODO: handleCancelOffer: onFailure');
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
        <CancelOfferModalTrigger size={size ? 'large' : undefined}>
          <ActionButton
            type="secondary"
            size="small"
            text={t('translation:buttons.action.cancelOffer')}
            handleClick={() => {
              console.log('Cancel offer modal opened');
            }}
          />
        </CancelOfferModalTrigger>
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
          Step: 1 -> cancelOffer
          ---------------------------------
        */}
        {modalStep === ListingStatusCodes.CancelOffer && (
          <Container>
            {/*
          ---------------------------------
          Offer Header
          ---------------------------------
        */}
            <ModalHeader>
              <ModalTitle>
                {t('translation:modals.title.cancelOffer')}
              </ModalTitle>
              <ModalDescription>
                {t('translation:modals.description.cancelOffer')}
              </ModalDescription>
            </ModalHeader>
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
                  text={t('translation:modals.buttons.cancelOffer')}
                  handleClick={handleCancelOffer}
                  danger
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
          </Container>
        )}
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
