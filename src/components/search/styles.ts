import * as DialogPrimitive from '@radix-ui/react-dialog';
import { styled, keyframes } from '../../stitches.config';

const overlayShow = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const contentShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -48%) scale(.96)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

export const SearchModalTrigger = styled('div', {
  // base styles
  width: '100%',
  maxWidth: '600px',
  marginRight: '7px',
});

export const ModalOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: 'rgba(250, 251, 253, 0.9)',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

export const ModalContent = styled(DialogPrimitive.Content, {
  backgroundColor: 'white',
  borderRadius: '30px',
  border: '1.5px solid #E5E8EB',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: 45,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': {
    outline: 'none',
  },
});
