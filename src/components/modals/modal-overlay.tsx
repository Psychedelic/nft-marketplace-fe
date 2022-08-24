import { forwardRef } from 'react';
import { ConfettiParticles } from '../particles';
import { ModalOverlayContainer as ModalOverlayStyled } from './styles';

export type ModalOverlayProps = {
  enableParticles?: boolean;
  children?: React.ReactChild;
  type?: string | undefined;
};

export const ModalOverlay = forwardRef<
  HTMLDivElement,
  ModalOverlayProps
>(
  (
    { enableParticles, type, children = <ConfettiParticles /> },
    ref,
  ) => (
    <ModalOverlayStyled
      ref={ref}
      type={type === 'dark' ? 'dark' : undefined}
    >
      {enableParticles && children}
    </ModalOverlayStyled>
  ),
);
