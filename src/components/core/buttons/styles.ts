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
        borderRadius: '10px',
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

export const PlugButtonContainer = styled('button', {
  // base styles
  padding: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '19px',
  borderRadius: '14px',
  border: 'none',
  background:
    // eslint-disable-next-line max-len
    'linear-gradient(93.07deg, #FFD719 0.61%, #F754D4 33.98%, #1FD1EC 65.84%, #48FA6B 97.7%)',
});

export const PlugButtonText = styled('div', {
  // base styles
  width: '136px',
  height: '40px',
  background: '#FFF',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
