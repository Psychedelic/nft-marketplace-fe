import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import { styled, keyframes } from '../../stitches.config';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '../icons';
import { SkeletonBox } from '../core';
import gradientBg from '../../assets/gradient-bg.png';

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
        width: '100%',
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
  top: '8%',
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

export const SearchResultsContainer = styled('div', {
  position: 'relative',
  minHeight: '200px',
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
  padding: '12px 16px',
  borderRadius: '16px',

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
    background: '$gainsboroColor',
  },

  '@md': {
    width: 'auto',
    borderRadius: 'unset',
    margin: '0px',
    padding: '24px 10px',
    border: 'unset',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const ItemDetailsWrapper = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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
  borderRadius: '6px',
});

export const ItemNameContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

export const ItemName = styled('div', {
  fontSize: '15px',
  fontWeight: '600',
  lineHeight: '22px',
  color: '$mainTextColor',
});

export const ItemDescription = styled('div', {
  fontSize: '13px',
  fontWeight: '500',
  lineHeight: '20px',
  color: '$textNeutralColor',
  textAlign: 'left',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const ItemSpan = styled('span', {
  fontSize: '15px',
  fontWeight: '600',
  lineHeight: '20px',
  color: '$textNeutralColor',
  textAlign: 'left',
  marginLeft: '5px',
});

export const ItemMetaDataContainer = styled('div', {
  // base styles
  display: 'flex',
  flexDirection: 'column',
});

export const ItemMetaTitle = styled('div', {
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '22px',
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
        marginBottom: '0px',
      },

      large: {
        marginBottom: '8px',
      },
    },
  },
});

export const WICPText = styled('div', {
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '22px',
  color: '$mainTextColor',

  // variants
  variants: {
    size: {
      small: {
        fontSize: '14px',
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
  fontSize: '13px',
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
    marginRight: '2px',
  },
});

export const LoadingWrapper = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginLeft: '-25px',
  height: '100%',
  color: '$primaryTextColor',
});

export const StyledRouterLink = styled(RouterLink, {
  '@md': {
    width: '100%',
    borderBottom: '1px solid $borderColor',
  },
});

export const CloseIcon = styled(Icon, {
  color: '$mainTextColor',
  position: 'absolute',
  right: '14px',
  top: '14px',
  display: 'none',

  variants: {
    isMobileScreen: {
      true: {
        display: 'flex',
        top: 'unset',
        alignItems: 'center',
        alignSelf: 'center',
      },
    },
  },
});

export const MobileSearchBar = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const TabsRoot = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$backgroundColor',

  '&:focus': {
    outline: 'none',
  },
});

export const TabsList = styled(Tabs.List, {
  flexShrink: 0,
  display: 'flex',
  borderBottom: '1px solid $borderColor',
  marginBottom: '12px',

  '&:focus': {
    outline: 'none',
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

  '&[data-state="active"]': {
    color: '$primary',
    borderBottom: '2px solid currentcolor',
  },
  '&[data-state="inactive"]': {
    color: '$mainTextColor',
  },
  '&:hover': {
    color: '$primary',
  },
  '&:focus': {
    outline: 'none',
  },
});

export const TabsContent = styled('div', {
  '&:focus': {
    outline: 'none',
  },
});

export const ThumbnailSkeleton = styled(SkeletonBox, {
  width: '40px',
  height: '40px',
  marginRight: '12px',
  borderRadius: '6px',
});

export const MediaWrapper = styled('div', {
  position: 'relative',
  height: '48px',
  marginRight: '12px',
});

export const PreviewDetails = styled('div', {
  minHeight: '48px',
  width: '48px',
  height: '48px',
});

export const NameCardBg = styled('div', {
  width: '48px',
  height: '48px',
  borderRadius: '5px',
  backgroundImage: `url(${gradientBg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
});

export const NameCardContainer = styled('div', {
  width: '48px',
  height: '48px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const NameCardCollection = styled('img', {
  width: '100%',
  maxWidth: '24px',
  padding: '5px',
});

export const NameCardTitle = styled('div', {
  fontSize: '6px',
  fontWeight: '700',
  textAlign: 'left',
  padding: '5px 5px 2.5px',
  color: '#000',
});
