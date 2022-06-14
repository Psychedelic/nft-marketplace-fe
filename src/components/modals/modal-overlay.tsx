import { forwardRef } from 'react';
import { ConfettiParticles } from '../particles';
import { ModalOverlayContainer as ModalOverlayStyled } from './styles';

export type ModalOverlayProps = {
  enableParticles?: boolean;
  children?: React.ReactChild;
};

export const ModalOverlay = forwardRef<
  HTMLDivElement,
  ModalOverlayProps
>(({ enableParticles, children = <ConfettiParticles /> }, ref) => (
  <ModalOverlayStyled ref={ref}>
    {enableParticles && children}
  </ModalOverlayStyled>
));
