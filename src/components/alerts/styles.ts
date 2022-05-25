import { styled } from '../../stitches.config';

export const AlertsContainer = styled('div', {
  position: 'fixed',
  top: '0px',
  left: '0px',
  right: '0px',
  backgroundColor: '$navBackgroundColor',
  zIndex: 2,
});

export const AlertsWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  background: 'rgba(255, 215, 25, 0.15)',
  color: '#987E00',
});

export const MessageContainer = styled('div', {
  display: 'flex',
});

export const Message = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '22px',
  marginLeft: '5px',

  // variants
  variants: {
    clickable: {
      true: {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
  },
});
