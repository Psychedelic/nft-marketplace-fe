import React, { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import {
  ModalOverlay,
  ModalContent,
  Container,
  ModalButtonWrapper,
  ActionText,
  PlugButtonContainer,
} from './styles';
import { Plug } from '../plug';
import { usePlugStore } from '../../store';

/* --------------------------------------------------------------------------
 * Connect to Plug Modal Component
 * --------------------------------------------------------------------------*/

export type ConnectToPlugModalProps = {
  actionText?: string;
};

export const ConnectToPlugModal = ({
  actionText,
}: ConnectToPlugModalProps) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const { isConnected } = usePlugStore();

  const handleModalOpen = (status: boolean) => {
    setModalOpened(status);
  };

  useEffect(() => {
    if (!isConnected) return;

    setModalOpened(false);
  }, [isConnected]);

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