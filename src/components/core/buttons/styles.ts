import { styled } from '../../../stitches.config';

export const Button = styled('button', {
  // base styles
  width: '100%',
  height: '100%',
  minWidth: '98px',
  minHeight: '33px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: '600',
  lineHeight: '22px',
  borderRadius: '14px',

  '&:hover': {
    cursor: 'pointer',
  },

  variants: {
    type: {
      primary: {
        backgroundColor: '#2253FF',
        color: '#FCFCFD',
        border: 'none',
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '#23262F',
        border: '1.5px solid #E5E8EB',
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#2253FF',
        border: '1.5px solid #2253FF',
      },
    },
    danger: {
      true: {
        backgroundColor: '#EF4444',
      },
    },

    size: {
      small: {
        fontSize: '16px',
        lineHeight: '19px',
        borderWidth: '1px',
      },
    },
  },
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
