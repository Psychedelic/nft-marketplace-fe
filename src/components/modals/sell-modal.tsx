import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, ModalInput } from '../core';
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

/* --------------------------------------------------------------------------
 * Sell Modal Component
 * --------------------------------------------------------------------------*/

export const SellModal = () => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);

  return (
    <DialogPrimitive.Root
      open={modalOpened}
      onOpenChange={setModalOpened}
    >
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
      <ModalContent>
        <Container>
          {/*
            ---------------------------------
            Modal Header
            ---------------------------------
          */}
          <ModalHeader>
            <ModalTitle>
              {t('translation:modals.title.listForSale')}
            </ModalTitle>
            <ModalDescription>
              {t('translation:modals.description.listForsale')}
            </ModalDescription>
          </ModalHeader>
          {/*
            ---------------------------------
            Sale Details
            ---------------------------------
          */}
          <SaleContentWrapper>
            <ModalInput
              placeholder={t(
                'translation:inputField.placeholder.amount',
              )}
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
            Modal Action Buttons
            ---------------------------------
          */}
          <ModalButtonsList>
            <ModalButtonWrapper>
              <ActionButton
                type="secondary"
                text={t('translation:modals.buttons.cancel')}
                handleClick={() => {
                  setModalOpened(false);
                }}
              />
            </ModalButtonWrapper>
            <ModalButtonWrapper>
              <ActionButton
                type="primary"
                text={t('translation:modals.buttons.completeListing')}
                handleClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('callback');
                }}
              />
            </ModalButtonWrapper>
          </ModalButtonsList>
        </Container>
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
