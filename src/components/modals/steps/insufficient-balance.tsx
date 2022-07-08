import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../../core';
import {
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalButtonsList,
  ModalButtonWrapper,
} from '../styles';
import { openSonicURL } from '../../../utils/handle-redirect-urls';

/* --------------------------------------------------------------------------
 * Insufficient Balance Step Component
 * --------------------------------------------------------------------------*/

export type InsufficientBalanceProps = {
  onCancel?: () => void;
};

export const InsufficientBalance = ({
  onCancel,
}: InsufficientBalanceProps) => {
  const { t } = useTranslation();

  return (
    <Container>
      <ModalHeader>
        <ModalTitle>
          {t('translation:modals.title.notEnoughFunds')}
        </ModalTitle>
        <ModalDescription size="medium">
          {t('translation:modals.description.notEnoughFunds')}
        </ModalDescription>
      </ModalHeader>
      <ModalButtonsList>
        <ModalButtonWrapper>
          <ActionButton type="secondary" onClick={onCancel}>
            {t('translation:modals.buttons.cancel')}
          </ActionButton>
        </ModalButtonWrapper>
        <ModalButtonWrapper>
          <ActionButton type="primary" onClick={openSonicURL}>
            {t('translation:modals.buttons.swapOnSonic')}
          </ActionButton>
        </ModalButtonWrapper>
      </ModalButtonsList>
    </Container>
  );
};
