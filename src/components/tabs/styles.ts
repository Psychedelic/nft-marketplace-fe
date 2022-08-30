import * as Tabs from '@radix-ui/react-tabs';
import { styled } from '../../stitches.config';
import { Icon } from '../icons';

export const TabsRoot = styled(Tabs.Root, {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$backgroundColor',

  '&:focus': {
    outline: 'none',
  },

  variants: {
    type: {
      trait: {
        marginTop: '15px',
      },
    },
  },
});

export const TabsList = styled(Tabs.List, {
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',

  '&:focus': {
    outline: 'none',
  },

  variants: {
    type: {
      trait: {
        justifyContent: 'start',
        borderBottom: '1px solid #DADADA',
      },
    },
  },
});

export const TabsTrigger = styled(Tabs.Trigger, {
  backgroundColor: '$backgroundColor',
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

  '&:hover': {
    color: '$mainTextColor',
  },

  variants: {
    status: {
      active: {
        borderBottom: '3px solid $tabActive',
        color: '$mainTextColor',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
      },
      inactive: {
        border: '0',
        color: '$textNeutralColor',
      },
      activeTrait: {
        borderBottom: '3px solid $primary',
        color: '$primary',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        fontSize: '15px',

        '&:hover': {
          color: '$primary',
        },
      },
      inactiveTrait: {
        border: '0',
        color: '#AFB5C5',
        fontSize: '15px',

        '&:hover': {
          color: '#AFB5C5',
        },
      },
    },
    type: {
      trait: {
        padding: '0px',

        '&:nth-child(2)': {
          marginLeft: '20px',
        },
      },
    },
  },
  '& img': {
    marginRight: '12px',
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

export const TabsInnerContentWrapper = styled('div', {
  maxHeight: '240px',
  overflow: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const TabContentHeader = styled('div', {
  display: 'flex',
  marginTop: '10px',
});

export const TabContentHeaderItem = styled('div', {
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '26px',
  color: '$mainTextColor',
  margin: '0px',

  variants: {
    width: {
      md: {
        width: '160px',
      },
      lg: {
        width: '216px',
      },
    },
    padding: {
      leftSm: {
        paddingLeft: '8px',
      },
    },
  },
});

export const TabContentContainer = styled('div', {
  display: 'flex',
  border: '1.5px solid $borderColor',
  borderRadius: '15px',
  marginTop: '10px',
  height: '48px',
  padding: '0px 10px',
  boxSizing: 'border-box',
  alignItems: 'center',

  variants: {
    disable: {
      true: {
        opacity: '0.4',
        // pointerEvents: 'none',
      },
    },
    enable: {
      true: {
        opacity: '1',
      },
    },
  },
});

export const TabContentWrapper = styled('div', {
  fontSize: '15px',
  color: '$mainTextColor',
  fontWeight: '400',
  width: 'unset',
  height: '100%',
  alignContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '0px 8px',

  variants: {
    padding: {
      rightSm: {
        padding: '0px 8px 0px 0px',
      },
    },
    border: {
      sides: {
        borderLeft: '1.5px solid $borderColor',
        borderRight: '1.5px solid $borderColor',
      },
    },
    width: {
      md: {
        width: '160px',
      },
      lg: {
        width: '216px',
      },
    },
    flex: {
      true: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
    greyedOut: {
      true: {
        color: '$textNeutralColor',
      },
    },
  },
});

export const ActionIconsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

export const IconWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  background: '$chipsNftBackgroundColor',
  borderRadius: '8px',
  padding: '10px',
  cursor: 'pointer',
  color: '$textNeutralColor',

  variants: {
    delete: {
      true: {
        '&:hover': {
          background: '$error',
          color: 'white',
        },
      },
    },
    code: {
      true: {
        '&:hover': {
          background: '$primary',
          color: 'white',
        },
      },
    },
  },

  '&:hover': {
    background: '$skyGrey',
  },
});

export const StyledIcon = styled(Icon, {
  fontSize: '1rem',
});

export const BottomGradient = styled('div', {
  background:
    'linear-gradient(-39.13deg, #ffffff 1.92%, rgba(255, 255, 255, 0) 82.44%)',
  width: '100%',
  bottom: '100px',
  height: '37px',
  left: '0',
  position: 'absolute',
});
