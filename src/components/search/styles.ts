import * as DialogPrimitive from '@radix-ui/react-dialog';
import { styled, keyframes } from '../../stitches.config';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '../icons';

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const contentShow = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(-50%) scale(.96)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(-50%) scale(1)',
  },
});

export const SearchModalTrigger = styled('div', {
  // base styles
  width: '100%',
  maxWidth: '600px',
  marginRight: '7px',

  '@md': {
    display: 'none',
  },

  variants: {
    startAnimation: {
      true: {
        animation: `${fadeIn} 900ms ease-in-out forwards`,
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        width: '100%'
      },
    },
  },
});

export const ModalOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$modalOverlay',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

export const ModalContent = styled(DialogPrimitive.Content, {
  minHeight: '200px',
  maxHeight: '600px',
  backgroundColor: '$backgroundColor',
  borderRadius: '30px',
  border: '1.5px solid $borderColor',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)',
  position: 'fixed',
  top: '15%',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: 20,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': {
    outline: 'none',
  },
});

export const SearchResultsWrapper = styled('div', {
  minHeight: '200px',
  height: '100%',
  backgroundColor: '$backgroundColor',
  border: '1.5px solid $borderColor',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.25)',
  position: 'fixed',
  top: '6%',
  left: '0px',
  right: '0px',
  zIndex: '-3',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': {
    outline: 'none',
  },
});

export const SearchContainer = styled('div', {
  // base styles
  width: '600px',
  marginBottom: '10px',
});

export const ItemsEmptyContainer = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '0px 0px 10px',
  height: '200px',
  color: '#969faf',
  fontSize: '14px',
  fontWeight: 'normal',
});

export const ItemsListContainer = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '0px 0px 10px',
  maxHeight: '325px',
  overflow: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '@md': {
    width: '100%',
    height: '100%',
    maxHeight: 'unset',
  },
});

export const ItemDetailsContainer = styled('div', {
  // base styles
  width: '560px',
  padding: '32px 20px',
  border: '1.5px solid $borderColor',
  background: '$chipsBackgroundColor',
  borderRadius: '14px',
  margin: '5px 0px',

  // variants
  variants: {
    lastChild: {
      true: {
        padding: '32px 0px 12px',
        borderTop: '1.5px solid $borderColor',
        borderBottom: 'initial',
        marginTop: '35px',
      },
    },
  },

  '&:hover': {
    cursor: 'pointer',
    background: '$backgroundColor',
  },

  '@md': {
    width: '90%',
    borderRadius: 'unset',
    margin: '0px',
    padding: '24px 10px',
    background: 'unset',
    border: 'unset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

export const ItemDetailsWrapper = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '90%',
});

export const ItemDetails = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
});

export const ItemLogo = styled('img', {
  width: '40px',
  height: '40px',
  marginRight: '12px',
  borderRadius: '12px',
});

export const ItemName = styled('div', {
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '$mainTextColor',
});

export const PriceDetails = styled('div', {
  // base styles
  display: 'flex',
  flexDirection: 'column',
});

export const WICPContainer = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  marginBottom: '6px',

  // variants
  variants: {
    size: {
      small: {
        marginBottom: '4px',
      },

      large: {
        marginBottom: '8px',
      },
    },
  },
});

export const WICPText = styled('div', {
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '$mainTextColor',

  // variants
  variants: {
    size: {
      small: {
        fontSize: '16px',
      },

      large: {
        fontSize: '24px',
      },
    },
  },
});

export const WICPLogo = styled('img', {
  width: '15px',
  height: '15px',
  marginRight: '5px',

  // variants
  variants: {
    size: {
      large: {
        width: '20px',
        height: '20px',
        marginRight: '4px',
      },
    },
  },
});

export const PriceText = styled('div', {
  fontSize: '16px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '#777E90',
  textAlign: 'right',

  // variants
  variants: {
    size: {
      large: {
        fontSize: '20px',
      },
    },
  },
});

export const SubText = styled('span', {
  '&:first-child': {
    marginRight: '10px',
  },
});

export const LoadingWrapper = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginLeft: '-25px',
  height: '100%',
});

export const StyledRouterLink = styled(RouterLink, {
  '@md': {
    width: '100%',
    background: '$chipsBackgroundColor',
    borderTop: '1.5px solid $borderColor',
    borderBottom: '1.5px solid $borderColor',
  },
});

export const CloseIcon = styled(Icon, {
  color: '$mainTextColor',
  right: '0px',
  top: '0px',
  display: 'none',

  variants: {
    isMobileScreen: {
      true: {
        display: 'flex',
      },
    },
  },
});