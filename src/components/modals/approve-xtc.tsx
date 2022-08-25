import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton } from '../core';
import {
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalButtonsList,
  ModalButtonWrapper,
  ModalContent,
} from '../modals/styles';
import { ModalOverlay } from './modal-overlay';
import {
  onboardingActions,
  useAppDispatch,
  useOnboardingStore,
} from '../../store';

/* --------------------------------------------------------------------------
 * Approve XTC
 * --------------------------------------------------------------------------*/

type ApproveXTCProps = {
  type?: string;
};

export const ApproveXTC = ({ type }: ApproveXTCProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { nftDetails } = useOnboardingStore();
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
  };

  const handleApproval = (e: any) => {
    e.preventDefault();
    dispatch(
      onboardingActions.setNftDetails({
        ...nftDetails,
        formErrors:
          validateFields && validateFields(nftDetails.formErrors),
        error: true,
      }),
    );

    if (!nftDetails.error) {
      setTimeout(() => handleModalOpen(true), 1000);
    }
  };

  const validateFields = (values: any) => {
    const errors = {
      name: '',
      supply: '',
    };

    if (!values.name) {
      errors.name = t('translation:onboarding.emptyFieldError');
    }

    if (!values.supply) {
      errors.supply = t('translation:onboarding.emptyFieldError');
    }

    return errors;
  };

  return (
    <DialogPrimitive.Root
      open={modalOpened}
      onOpenChange={handleModalOpen}
    >
      <DialogPrimitive.Trigger asChild>
        <ActionButton
          type={type ? type : 'primary'}
          onClick={handleApproval}
        >
          {t('translation:onboarding.reviewCollection')}
        </ActionButton>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <ModalOverlay type="dark" />
        <ModalContent size="small">
          <Container>
            <ModalHeader>
              <ModalTitle alignText="center">
                {t('translation:modals.title.approveXtc')}
              </ModalTitle>
              <ModalDescription
                size="medium"
                alignText="center"
                width="unset"
              >
                {t('translation:modals.description.approveXtc')}
              </ModalDescription>
            </ModalHeader>
            <ModalButtonsList justifyContent="center">
              <ModalButtonWrapper>
                <ActionButton
                  type="secondary"
                  onClick={() =>
                    handleModalOpen && handleModalOpen(false)
                  }
                >
                  {t('translation:modals.buttons.cancel')}
                </ActionButton>
              </ModalButtonWrapper>
              <ModalButtonWrapper>
                <ActionButton type="primary">
                  {t('translation:modals.buttons.approveXtc')}
                </ActionButton>
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        </ModalContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
