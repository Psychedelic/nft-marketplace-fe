import * as Tabs from '@radix-ui/react-tabs';
import { styled } from '../../stitches.config';

export const Container = styled('div', {
  position: 'relative',
  display: 'flex',
});

export const TabsRoot = styled(Tabs.Root, {
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$backgroundColor',

  '&:focus': {
    outline: 'none',
  },
});

export const TabsList = styled(Tabs.List, {
  padding: '40px 80px 34px',

  flexShrink: 0,
  display: 'flex',
  justifyContent: 'left',

  '&:focus': {
    outline: 'none',
  },
});

export const TabsTrigger = styled(Tabs.Trigger, {
  backgroundColor: '$whiteSmoke',
  padding: '0',
  width: 154,
  height: 40,
  borderRadius: '100px',
  marginRight: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontweight: '600',
  fontSize: '18px',
  lineHeight: '18px',
  border: '0px',
  cursor: 'pointer',
  fontFamily: 'proxima-nova, sans-serif',
  variants: {
    status: {
      active: {
        backgroundColor: '$primary',
        color: '#FCFCFD',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        '&:hover': {
          color: '#FCFCFD',
        },
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
    color: '$mainTextColor',
  },
  '&:focus': {
    outline: 'none',
  },
});

export const TabsContentWrapper = styled('div', {
  display: 'flex',

  '@md': {
    flexWrap: 'wrap',
    justifyContent: 'center',
    borderTop: '1px solid $borderColor',
    background: '$mobileBackgroundColor',
  },
});

export const TabsContent = styled(Tabs.Content, {
  '&:focus': {
    outline: 'none',
  },
});
