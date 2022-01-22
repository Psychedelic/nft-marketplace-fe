import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from '../../../stitches.config';

export const DropdownStyle = styled(DropdownMenu.Trigger, {
  border: '2px solid #E5E8EB',
  background: 'transparent',
  boxSizing: 'border-box',
  borderRadius: '14px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#23262F',
  width: '250px',
  padding: '0 15px',
  cursor: 'pointer',

  '&:focus': {
    outline: 'none',
  },
});

export const DropdownContent = styled(DropdownMenu.Content, {
  minWidth: '250px',
  backgroundColor: 'white',
  border: '2px solid #E5E8EB',
  boxSizing: 'border-box',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
  },
  borderRadius: '15px',
  marginTop: '2%',
  padding: '0',
});

export const DropdownRadioGroup = styled(DropdownMenu.RadioGroup, {
  display: 'block',
});

export const DropdownMenuItem = styled(DropdownMenu.RadioItem, {
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

  '&:focus': {
    outline: 'none',
  },
});

export const DropdownMenuSeparator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: '#E5E8EB',
  width: '100%',
});
