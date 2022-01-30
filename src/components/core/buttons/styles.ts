import { styled } from '../../../stitches.config';

export const Button = styled('button', {
  variants: {
    backgroundColor: {
      filled: {
        backgroundColor: '#2253FF',
        fontWeight: '600',
        color: '#FCFCFD',
        border: 'none',
      },
      notfilled: {
        backgroundColor: 'transparent',
        color: '#23262F',
      },
    },
    outline: {
      solid: {
        background: 'transparent',
        border: '1px solid #2253FF',
        fontWeight: '600',
        color: '#2253FF',
      },
      light: {
        border: '1px solid #E5E8EB',
        background: 'transparent',
        fontWeight: '600',
        color: '#23262F',
      },
      text: {
        bold: {
          fontWeight: '600',
          color: 'pink',
        },
      },
    },
  },
  cursor: 'pointer',
  borderRadius: '10px',
  fontSize: '16px',
  lineHeight: '19px',
  padding: '8px 12px',
  minWidth: '98px',
  minHeight: '33px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const LinkButtonStyles = styled('a', {
  border: '2px solid #E5E8EB',
  background: 'transparent',
  fontWeight: '800',
  color: '#23262F',
  cursor: 'pointer',
  borderRadius: '14px',
  fontSize: '14px',
  padding: '10px 20px',
});
