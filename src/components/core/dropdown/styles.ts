import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from '../../../stitches.config';
import { Icon } from '../../icons';

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

  '@md': {
    marginLeft: '10px',
    height: '41px',
  },
});

export const DropdownButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 10,
  height: 10,
  padding: '10px 15px',
  margin: -10,
  color: '$mainTextColor',
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
  background: '$backgroundColor',
  color: '$mainTextColor',
  border: '2px solid $borderColor',
  variants: {
    width: {
      small: {
        marginTop: '0',
        minWidth: '140px',
        left: '-20px',
        top: '-8px',
        position: 'absolute',
      },
    },
  },

  overflow: 'hidden',

  '& .list-item': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    position: 'relative',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
    cursor: 'pointer',

    transition: 'background-color 0.2s ease-in-out',

    '& p': {
      margin: '0',
    },

    borderBottom: '1px solid $borderColor',
    '&:last-child': {
      borderBottom: 'none',
    },

    '&:hover': {
      background: '$borderColor',
    },

    '&:focus': {
      outline: 'none',
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

export const DropdownRadioMenuItem = styled(
  DropdownMenu.RadioItem,
  {},
);

export const DropdownMenuItem = styled(DropdownMenu.Item, {});

export const EllipsisIcon = styled(Icon, {
  color: '$iconGrey',
});
