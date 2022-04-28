import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as HoverCard from '@radix-ui/react-hover-card';
import { styled } from '../../../stitches.config';

export const DropdownRoot = styled(DropdownMenu.Root, {
  background: '$backgroundColor',
});

export const DropdownStyle = styled(DropdownMenu.Trigger, {
  border: '2px solid $borderColor',
  background: '$backgroundColor',
  boxSizing: 'border-box',
  borderRadius: '14px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '$mainTextColor',
  width: '210px',
  height: '44px',
  padding: '0 15px',
  cursor: 'pointer',
  fontFamily: 'proxima-nova, sans-serif',

  '&:focus': {
    outline: 'none',
  },
});

export const DropdownContent = styled(DropdownMenu.Content, {
  minWidth: '210px',
  boxSizing: 'border-box',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
  },
  borderRadius: '15px',
  marginTop: '10px',
  padding: '0',
  cursor: 'pointer',
  variants: {
    width: {
      small: {
        marginTop: '2px',
        minWidth: '160px',
      },
    },
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

export const DropdownRadioGroup = styled(DropdownMenu.RadioGroup, {
  display: 'block',
  borderRadius: '15px',
});

export const DropdownGroup = styled(DropdownMenu.Group, {
  display: 'block',
});

export const DropdownRadioMenuItem = styled(DropdownMenu.RadioItem, {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  cursor: 'pointer',

  '&:focus': {
    outline: 'none',
  },
});

export const DropdownMenuItem = styled(DropdownMenu.Item, {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  cursor: 'pointer',

  '&:focus': {
    outline: 'none',
  },
});

export const DropdownMenuSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  variants: {
    background: {
      dark: {
        background: '#353945',
      },
      light: {
        background: '#E5E8EB',
      },
    },
  },
  width: '100%',
});

export const ConnectToPlug = styled(HoverCard.Content, {
  minWidth: '220px',
  backgroundColor: '$backgroundColor',
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

  '& div:nth-child(2)': {
    height: '1px',
    background: '#E5E8EB',
  },
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',

  '& p': {
    margin: '0',
  },
});

export const PlugFlex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#23262F',
  cursor: 'pointer',

  '& img': {
    marginRight: '15px',
  },

  '& p': {
    margin: '0px',
  },
});
