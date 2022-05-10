import * as Popover from '@radix-ui/react-popover';
import { styled } from '../../stitches.config';
import { Icon, PlugIcon } from '../icons';

export const PlugButtonContainer = styled('button', {
  // base styles
  padding: '2px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '19px',
  borderRadius: '15px',
  border: 'none',
  marginLeft: '10px',
  background:
    'linear-gradient(93.07deg, #FFD719 0.61%, #F754D4 33.98%, #1FD1EC 65.84%, #48FA6B 97.7%)',

  '&:hover': {
    cursor: 'pointer',
  },
});

export const PlugButtonText = styled('div', {
  // base styles
  width: '136px',
  height: '40px',
  padding: '2px 4px',
  backgroundColor: '$buttonBackgroundColor',
  color: '$mainTextColor',
  borderRadius: '14px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'proxima-nova, sans-serif',
});

export const PopoverTrigger = styled(Popover.Trigger, {
  '&:focus': {
    outline: 'none',
  },
});

export const ConnectToPlugButton = styled(Popover.Content, {
  minWidth: '220px',
  border: '2px solid $borderColor',
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

  background: '$backgroundColor',
  color: '$mainTextColor',

  overflow: 'hidden',
});

export const ListItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  cursor: 'pointer',

  transition: 'background-color 0.2s ease-in-out',

  '& img': {
    marginRight: '15px',
  },

  '& p': {
    margin: '0px',
  },

  borderBottom: '1px solid $borderColor',
  '&:last-child': {
    borderBottom: 'none',
  },

  '&:hover': {
    background: '$borderColor',
  },
});

export const PlugIconStyled = styled(PlugIcon, {
  marginRight: '10px',
  width: '12px',
});

export const PlugArrowDownIcon = styled(Icon, {
  transition: 'transform 0.1s ease-in-out',
  marginLeft: '10px',

  variants: {
    rotate: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});
