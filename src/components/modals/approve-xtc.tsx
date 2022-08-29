import React, { useEffect, useState } from 'react';
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
  ProgressBar,
  SpinnerWrapper,
} from '../modals/styles';
import { ModalOverlay } from './modal-overlay';
import {
  onboardingActions,
  useAppDispatch,
  useOnboardingStore,
} from '../../store';
import { SpinnerIcon } from '../icons/custom';
import { ApproveXTCStatusCodes } from '../../constants/approve-xtc';

/* --------------------------------------------------------------------------
 * Approve XTC
 * --------------------------------------------------------------------------*/

type ApproveXTCProps = {
  type?: string;
  setIsSubmitting: (value: boolean) => void;
  setIsSubmitted?: (value: boolean) => void;
  setIsNftDetailsSubmitted: (value: boolean) => void;
};

export const ApproveXTC = ({
  type,
  setIsSubmitting,
  setIsNftDetailsSubmitted,
}: ApproveXTCProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { nftDetails } = useOnboardingStore();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [isXTCApproved, setIsXTCApproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalStep, setModalStep] = useState<ApproveXTCStatusCodes>(
    ApproveXTCStatusCodes.Pending,
  );

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
  };

  useEffect(() => {
    dispatch(
      onboardingActions.setNftDetails({
        ...nftDetails,
        formErrors: validateFields(nftDetails),
      }),
    );
  }, [nftDetails.name, nftDetails.supply]);

  const handleApproval = (e: any) => {
    e.preventDefault();
    setIsSubmitting && setIsSubmitting(true);
    if (!nftDetails.formErrors.error) {
      setIsNftDetailsSubmitted(true);
      setTimeout(() => handleModalOpen(true), 1000);
    }
  };

  const approveXTC = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsXTCApproved(true);
      setModalStep(ApproveXTCStatusCodes.Confirmed);
    }, 1000);
  };

  const validateFields = (values: any) => {
    const errors = {
      name: '',
      supply: '',
      error: false,
    };

    if (!values.name) {
      errors.name = t('translation:onboarding.emptyFieldError');
    }

    if (!values.supply) {
      errors.supply = t('translation:onboarding.emptyFieldError');
    }

    if (!values.name || !values.supply) {
      errors.error = true;
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
          <ProgressBar isXTCApproved={isXTCApproved} />
          <Container>
            {loading && (
              <SpinnerWrapper>
                <SpinnerIcon color="black" size="35" />
              </SpinnerWrapper>
            )}
            {modalStep === ApproveXTCStatusCodes.Confirmed ? (
              <>
                <ModalHeader>
                  <ModalTitle alignText="center">
                    {t('translation:modals.title.approvedXtc')}
                  </ModalTitle>
                  <ModalDescription
                    size="medium"
                    alignText="center"
                    width="unset"
                  >
                    {t('translation:modals.description.approvedXtc')}
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
                      {t('translation:modals.buttons.doItLater')}
                    </ActionButton>
                  </ModalButtonWrapper>
                  <ModalButtonWrapper>
                    <ActionButton
                      type="primary"
                      onClick={() =>
                        handleModalOpen && handleModalOpen(false)
                      }
                    >
                      {t(
                        'translation:modals.buttons.spawnMarkeplace',
                      )}
                    </ActionButton>
                  </ModalButtonWrapper>
                </ModalButtonsList>
              </>
            ) : (
              <>
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
                    <ActionButton type="primary" onClick={approveXTC}>
                      {t('translation:modals.buttons.approveXtc')}
                    </ActionButton>
                  </ModalButtonWrapper>
                </ModalButtonsList>
              </>
            )}
          </Container>
        </ModalContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
