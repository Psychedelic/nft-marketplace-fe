import { ConfettiParticles } from '../particles';
import { ModalOverlayContainer as ModalOverlayStyled } from './styles';

export type ModalOverlayProps = {
  enableParticles?: boolean;
  children?: React.ReactChild;
};

export const ModalOverlay: React.FC<ModalOverlayProps> = ({
  enableParticles,
  children = <ConfettiParticles />,
}: ModalOverlayProps) => (
  <ModalOverlayStyled>
    {enableParticles && children}
  </ModalOverlayStyled>
);
