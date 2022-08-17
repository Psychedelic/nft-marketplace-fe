import { styled } from '../../../stitches.config';

export const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  minWidth: '98px',
  minHeight: '33px',

  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});

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
  fontFamily: 'proxima-nova, sans-serif',

  '&:hover': {
    cursor: 'pointer',
  },

  variants: {
    type: {
      primary: {
        backgroundColor: '$primary',
        color: '#FCFCFD',
        border: 'none',
      },
      secondary: {
        backgroundColor: 'transparent',
        color: '$mainTextColor',
        border: '1.5px solid $buttonsBorderColor',
      },
      outline: {
        backgroundColor: 'transparent',
        color: '$primary',
        border: '1.5px solid $primary',
      },
      active: {
        background: 'rgba(34, 83, 255, 0.16)',
        color: '$primary',
        border: 'none',
      },
    },

    disabled: {
      true: {
        opacity: 0.3,
        pointerEvents: 'none',
      },
    },

    danger: {
      true: {
        backgroundColor: '#EF4444',
        color: '#ffffff',
        border: 'none',
      },
    },

    size: {
      small: {
        fontSize: '16px',
        lineHeight: '19px',
        borderWidth: '1px',
        borderRadius: '10px',
      },
      wide: {
        padding: '8px 35px',
      },
    },

    fontWeight: {
      light: {
        fontWeight: 500,
      },
    },
  },
  cursor: 'pointer',
  padding: '8px 12px',

  '@sm': {
    fontSize: '16px',
  },
});

export const LinkButtonStyles = styled('a', {
  // base styles
  border: '2px solid $buttonsBorderColor',
  backgroundColor: '$backgroundColor',
  fontWeight: '500',
  color: '$mainTextColor',
  cursor: 'pointer',
  borderRadius: '14px',
  fontSize: '16px',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px',

  // variants
  variants: {
    type: {
      textBtn: {
        padding: '0px 12px',
        width: 'initial',
        height: '40px',
      },
    },
  },

  '&:last-child': {
    marginRight: '0px',
  },

  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    boxShadow: '0px 0px 8px 3px $navBackgroundColor',
    transform: 'scale(1.085)',
  },
  '&:active': {
    transform: 'scale(0.985)',
  },
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  cursor: 'pointer',

  '& img': {
    marginRight: '15px',
  },

  '& p': {
    margin: '0px',
  },
});

export const IconButtonStyles = styled('div', {
  // base styles
  border: '2px solid $buttonsBorderColor',
  backgroundColor: '$buttonBackgroundColor',
  fontWeight: '500',
  color: '#23262F',
  cursor: 'pointer',
  borderRadius: '14px',
  fontSize: '16px',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '10px',

  '&:last-child': {
    marginRight: '0px',
  },
});
