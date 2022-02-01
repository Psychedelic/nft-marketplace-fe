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

export const SellModalTrigger = styled('div', {
  width: '140px',
  height: '50px',
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

export const Container = styled('div', {
  width: '100%',
});

export const ModalHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '0px 0px 30px',
});

export const ModalTitle = styled(DialogPrimitive.Title, {
  fontSize: '32px',
  fontWeight: 'bold',
  lineHeight: '39px',
  color: '#23262F',
  margin: '0px 0px 20px',
});

export const ModalDescription = styled(DialogPrimitive.Description, {
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '#767D8E',
  margin: '0px',
});

export const SaleContentWrapper = styled('div', {
  minWidth: '430px',
});

export const FeeContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '35px 0px 0px',
});

export const FeeDetails = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',

  '&:last-child': {
    marginBottom: '0px',
  },
});

export const FeeLabelContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const FeeLabel = styled('div', {
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '#767D8E',
  marginRight: '6px',
});

export const InfoIcon = styled('img', {
  width: '16px',
  height: '16px',
});

export const FeePercent = styled('div', {
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '#767D8E',
  marginLeft: '6px',
});

export const ModalButtonsList = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '35px',
});

export const ModalButtonWrapper = styled('div', {
  width: '205px',
  height: '56px',
  marginRight: '21px',

  '&:last-child': {
    marginRight: '0px',
  },
});
