import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton } from '../core';
import {
  ModalContent,
  Container,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalButtonsList,
  ModalButtonWrapper,
} from './styles';
import { ModalOverlay } from './modal-overlay';
import { ThemeRootElement } from '../../constants/common';
import { openSonicURL } from '../../utils/ handle-redirect-urls';

export const InsufficientBalance = () => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const handleModalOpen = (modalOpenedStatus: boolean) => {
    setModalOpened(modalOpenedStatus);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  return (
    <DialogPrimitive.Root
      open={modalOpened}
      onOpenChange={handleModalOpen}
    >
      <DialogPrimitive.Trigger asChild>
        <ActionButton>Open</ActionButton>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal
        container={document.getElementById(ThemeRootElement)}
      >
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
        <ModalContent
          onInteractOutside={(event) => {
            event.preventDefault();
          }}
          onEscapeKeyDown={(event) => {
            event.preventDefault();
          }}
        >
          <Container>
            <ModalHeader>
              <ModalTitle>
                {t('translation:modals.title.insufficientBalance')}
              </ModalTitle>
              <ModalDescription size="medium">
                {t(
                  'translation:modals.description.insufficientBalance',
                )}
              </ModalDescription>
            </ModalHeader>
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
                <ActionButton type="primary" onClick={openSonicURL}>
                  {t('translation:modals.buttons.swapOnSonic')}
                </ActionButton>
              </ModalButtonWrapper>
            </ModalButtonsList>
          </Container>
        </ModalContent>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
