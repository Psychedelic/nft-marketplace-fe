import { styled, keyframes } from '../../stitches.config';
import { Link as RouterLink } from 'react-router-dom';
import * as Switch from '@radix-ui/react-switch';
import { Icon } from '../icons';

const slideOutRight = keyframes({
  '0%': { right: '0%' },
  '100%': { right: '-100%' },
});

const slideInRight = keyframes({
  '0%': { right: '-100%' },
  '100%': { right: '0%' },
});

const slideInLeft = keyframes({
  '0%': { left: '-100%' },
  '100%': { left: '0%' },
});

const slideOutLeft = keyframes({
  '0%': { left: '0%' },
  '100%': { left: '-100%' },
});

const fadeOut = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const Container = styled('div', {
  // base styles
  position: 'fixed',
  top: '0px',
  left: '0px',
  right: '0px',
  backgroundColor: '$navBackgroundColor',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08)',
  zIndex: 2,

  // variants
  variants: {
    showAlerts: {
      true: {
        top: '38px',
      },
    },
    openMobileNavbar: {
      true: {
        background: 'rgba(0, 0, 0, 0.6)',
        height: '100%',
      },
    },
  },
});

export const NavBarWrapper = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '14px 20px',
  background: '$navBackgroundColor',

  '@md': {
    padding: '14px',
  },
});

export const LogoContainer = styled('div', {
  // base styles
  display: 'flex',
});

export const LogoIcon = styled('img', {
  width: '100px',
  marginRight: '7px',

  '@md': {
    width: '80px',
  },
});

export const BackIcon = styled(Icon, {
  display: 'none',

  '@md': {
    position: 'relative',
    color: '$mainTextColor',
  },

  variants: {
    startAnimation: {
      true: {
        animation: `${slideInLeft} 100ms ease-in forwards`,
        display: 'flex',
      },
    },
    stopAnimation: {
      true: {
        animation: `${slideOutLeft} 100ms ease-out forwards`,
      },
    },
  },
});

export const LogoName = styled(Icon, {
  width: '68px',
  marginRight: '7px',
  marginTop: '5px',
});

export const ActionButtonsContainer = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
});

export const MobileMenuContainer = styled('div', {
  '@md': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },

  variants: {
    startAnimation: {
      true: {
        animation: `${slideOutRight} 1s ease-out forwards`,
      },
    },
    stopAnimation: {
      true: {
        animation: `${slideInRight} 1s ease-in forwards`,
      },
    },
  },
});

export const MobileMenuContentWrapper = styled('div', {
  transition: 'transform 0.3s ease-in-out',

  variants: {
    openMobileNavbar: {
      true: {
        transform: 'translateY(0%)',
      },
      false: {
        transform: 'translateY(-100%)',
      },
    },
  },

  '@md': {
    background: '$backgroundColor',
  },
});

export const NavItemContent = styled('div', {});

export const WICPLogo = styled('img', {
  width: '15px',
  height: '15px',
  paddingRight: '1rem',

  variants: {
    paddingLeft: {
      true: {
        paddingLeft: '0.5rem',
        paddingRight: '0',
      },
    },
  },
});

export const NavItem = styled('div', {
  borderTop: '1.5px solid $borderColor',
  padding: '9px 14px',
  display: 'flex',
  alignItems: 'center',
  color: '$mainTextColor',
  fontSize: '16px',

  '& p': {
    fontWeight: '500',
  },
});

export const PlugLogo = styled('img', {
  paddingRight: '1rem',
});

export const PrincipalAddress = styled('p', {
  color: '$mobilePrincipalIdGrey',
  fontSize: '14px',
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',

  variants: {
    justifyBetween: {
      true: {
        justifyContent: 'space-between',
        width: '100%',
      },
    },
    justifyEnd: {
      true: {
        justifyContent: 'end',
      },
    },
    directionColumn: {
      true: {
        flexDirection: 'column',
      },
    },
  },
});

export const TotalWICPBalanceTitle = styled('span', {
  color: '#9EA6B5',
  fontSize: '14px',
  fontWeight: '500',
});

export const TotalWICPBalanceAmount = styled('p', {
  fontSize: '18px',
  fontWeight: '500',
  margin: '0',
});

export const StyledSwitch = styled(Switch.Root, {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '#E3E1E1',
  borderRadius: '9999px',
  position: 'relative',
  WebkitTapHighlightColor: '#E3E1E1',
  '&[data-state="checked"]': { backgroundColor: '#3574F4' },
});

export const StyledThumb = styled(Switch.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: '#EFEEEE',
  borderRadius: '9999px',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
});

export const Divider = styled('div', {
  height: '1px',
  background: '$borderColor',
});

export const NotConnectedMessageWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '30px 0',
});

export const NotConnectedMessage = styled('p', {
  textAlign: 'center',
  maxWidth: '270px',
  color: '$disconnectedTextColor',
  fontSize: '16px',
  margin: '0 0 20px',
});

export const MobileNavbarIcons = styled(Icon, {
  color: '$mainTextColor',
});

export const CloseIcon = styled(MobileNavbarIcons, {
  animation: `${fadeIn} 1s ease-out forwards`,
});

export const StyledIcon = styled(Icon, {
  color: '$mobileStyledIconColor',
  paddingRight: '1rem',
});

export const MobileSearchBarActions = styled('div', {});

export const StyleRouter = styled(RouterLink, {
  variants: {
    startAnimation: {
      true: {
        animation: `${fadeOut} 100ms ease-out forwards`,
        display: 'none',
      },
      false: {
        animation: `${fadeIn} 100ms ease-in forwards`,
        display: 'block',
      },
    },
  },
});
