import React from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton, ModalInput } from '../core';
import infoLogo from '../../assets/info-icon.svg';
import {
  SellModalTrigger,
  ModalOverlay,
  ModalContent,
  Container,
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

export const SellModal = () => {
  const { t } = useTranslation();

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <SellModalTrigger>
          <ActionButton
            asChild
            type="primary"
            text={t('translation:buttons.action.sell')}
            handleClick={() => {
              // eslint-disable-next-line no-console
              console.log('callback');
            }}
          />
        </SellModalTrigger>
      </DialogPrimitive.Trigger>
      <ModalOverlay />
      <ModalContent>
        <Container>
          <ModalTitle>
            {t('translation:modals.title.listForSale')}
          </ModalTitle>
          <ModalDescription>
            {t('translation:modals.description.listForsale')}
          </ModalDescription>
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
          <ModalButtonsList>
            <ModalButtonWrapper>
              <ActionButton
                type="secondary"
                text={t('translation:modals.buttons.cancel')}
                handleClick={() => {
                  // eslint-disable-next-line no-console
                  console.log('callback');
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
