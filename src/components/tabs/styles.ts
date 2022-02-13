import * as Tabs from '@radix-ui/react-tabs';
import { styled } from '../../stitches.config';

export const TabsRoot = styled(Tabs.Root, {
  display: 'flex',
  flexDirection: 'column',

  '&:focus': {
    outline: 'none',
  },
});

export const TabsList = styled(Tabs.List, {
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',

  '&:focus': {
    outline: 'none',
  },
});

export const TabsTrigger = styled(Tabs.Trigger, {
  backgroundColor: 'white',
  padding: '0 20px',
  height: 45,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontweight: '500',
  fontSize: '18px',
  lineHeight: '22px',
  border: '0px',
  cursor: 'pointer',
  fontFamily: 'proxima-nova, sans-serif',
  variants: {
    status: {
      active: {
        borderBottom: '3px solid #23262F',
        color: '#23262F',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
      },
      inactive: {
        border: '0',
        color: '#777E90',
      },
    },
  },
  '& img': {
    marginRight: '12px',
  },
  '&:hover': {
    color: '#23262F',
  },
  '&:focus': {
    outline: 'none',
  },
});
