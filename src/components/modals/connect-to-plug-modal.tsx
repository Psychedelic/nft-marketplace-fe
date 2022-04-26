import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ActionButton } from '../core';
import {
  ModalOverlay,
  ModalContent,
  Container,
  ModalButtonWrapper,
  ActionText,
  PlugButtonContainer,
} from './styles';
import { Plug } from '../plug';

/* --------------------------------------------------------------------------
 * Connect to Plug Modal Component
 * --------------------------------------------------------------------------*/

export type ConnectToPlugModalProps = {
  onClose?: () => void;
  actionText?: string;
};

export const ConnectToPlugModal = ({
  onClose,
  actionText,
}: ConnectToPlugModalProps) => {
  const { t } = useTranslation();

  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
  };

  const handleModalClose = () => {
    setModalOpened(false);
    // eslint-disable-next-line
    onClose && onClose();
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
        <ActionText
          onClick={() => console.log('connect to plug modal opened')}
        >
          {actionText}
        </ActionText>
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
        <Container>
          {/*
            ---------------------------------
            Offer Action Buttons
            ---------------------------------
          */}
          <PlugButtonContainer>
            <ModalButtonWrapper fullWidth>
							<Plug />
            </ModalButtonWrapper>
          </PlugButtonContainer>
        </Container>
      </ModalContent>
    </DialogPrimitive.Root>
  );
};
