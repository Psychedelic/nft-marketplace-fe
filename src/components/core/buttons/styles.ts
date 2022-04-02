import * as HoverCard from '@radix-ui/react-hover-card';
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
  fontFamily: 'proxima-nova, sans-serif',

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
        color: '$mainTextColor',
        border: '1.5px solid $borderColor',
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
  cursor: 'pointer',
  padding: '8px 12px',
});

export const LinkButtonStyles = styled('a', {
  // base styles
  border: '2px solid #E5E8EB',
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
  marginLeft: '10px',
  background:
    // eslint-disable-next-line max-len
    'linear-gradient(93.07deg, #FFD719 0.61%, #F754D4 33.98%, #1FD1EC 65.84%, #48FA6B 97.7%)',

  '&:hover': {
    cursor: 'pointer',
  },
});

export const PlugButtonText = styled('div', {
  // base styles
  width: '136px',
  height: '40px',
  backgroundColor: '$buttonBackgroundColor',
  color: '$mainTextColor',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'proxima-nova, sans-serif',
});

export const ConnectToPlugButton = styled(HoverCard.Content, {
  minWidth: '220px',
  border: '2px solid $buttonBorderColor',
  boxSizing: 'border-box',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
  },
  borderRadius: '15px',
  marginTop: '5%',
  padding: '0',

  '& div:nth-child(2)': {
    height: '1px',
    background: '#E5E8EB',
  },
  variants: {
    background: {
      dark: {
        background: '#141416',
        color: '#ffffff',
        border: '2px solid #353945',
      },
      light: {
        background: '#ffffff',
        color: '#23262F',
        border: '2px solid #E5E8EB',
      },
    },
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
  border: '2px solid $borderColor',
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

export const PlugIcon = styled('img', {
  marginRight: '10px',
  width: '12px',
});

export const PlugArrowDownIcon = styled('img', {
  marginLeft: '10px',
});
