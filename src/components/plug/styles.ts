import * as Dropdown from '@radix-ui/react-dropdown-menu';
import { styled } from '../../stitches.config';

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

export const DropdownTrigger = styled(Dropdown.Trigger, {
  '&:focus': {
    outline: 'none',
  },
});

export const ConnectToPlugButton = styled(Dropdown.Content, {
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

export const PlugIcon = styled('img', {
  marginRight: '10px',
  width: '12px',
});

export const PlugArrowDownIcon = styled('img', {
  marginLeft: '10px',
});
