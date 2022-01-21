import { styled } from '../../../stitches.config';

export const Button = styled('button', {
  variants: {
    backgroundColor: {
      filled: {
        backgroundColor: '#2253FF',
        fontWeight: '800',
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
        border: '2px solid #2253FF',
        fontWeight: '800',
        color: '#2253FF',
      },
      light: {
        border: '2px solid #E5E8EB',
        background: 'transparent',
        fontWeight: '800',
        color: '#23262F',
      },
      text: {
        bold: {
          fontWeight: '800',
          color: 'pink',
        },
      },
    },
  },
  cursor: 'pointer',
  borderRadius: '14px',
  fontSize: '14px',
  padding: '10px 20px',
});
