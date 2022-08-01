import { styled, keyframes } from '../../stitches.config';
import { Icon } from '../icons';

const closeArrowBounce = keyframes({
  '50%': {
    transform: 'translateX(-3px)',
  },
});

const openArrowBounce = keyframes({
  '50%': {
    transform: 'rotate(-180deg) translateX(-3px)',
  },
});

const slideUp = keyframes({
  '0%': {
    transform: 'translateY(100%)',
  },
  '100%': {
    transform: 'translateY(0%)',
  },
});

export const Container = styled('div', {
  position: 'relative',

  '@md': {
    position: 'absolute',
    zIndex: '100',
    top: '0',
  },
});

export const CloseFilterContainer = styled('div', {
  // base styles
  position: 'absolute',
  right: '-22px',
  top: '24px',
  zIndex: 1,

  // variants
  variants: {
    opened: {
      true: {
        position: 'absolute',
        right: '-34px',
        top: '24px',
        zIndex: 1,
      },
    },
  },
});

export const FiltersContainer = styled('div', {
  width: '340px',
  background: '$backgroundColor',
  height: '100vh',
  borderTop: '1px solid $borderColor',
  position: 'sticky',
  top: '0',
  overflowY: 'scroll',
  overflowX: 'hidden',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  transition: 'transform 0.3s ease-in-out',

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  '@md': {
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: '0',
    top: '0',
    display: 'none',
  },

  variants: {
    isOpenFiltersMenu: {
      true: {
        display: 'block',
        animation: `${slideUp} 700ms ease-in`,
      },
    },
  },
});

export const FiltersWrapper = styled('div', {
  padding: '0 20px 32px',
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  margin: '0 0 0px',

  variants: {
    justify: {
      spaceBetween: {
        justifyContent: 'space-between',
      },
    },
  },
});

export const FilterSection = styled('div', {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  margin: '35px 0px 0px',

  '&:nth-child(1)': {
    marginBottom: '15px',
  },
});

export const FilterGroup = styled('div', {
  width: '100%',
  marginBottom: '30px',
});

export const Heading = styled('h5', {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '22px',
  lineHeight: '27px',
  color: '$mainTextColor',
  margin: 0,
});

export const ClearButton = styled('div', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '19px',
  color: '$primary',
  margin: '0px 0px 0px 15px',

  '&:hover': {
    cursor: 'pointer',
  },
});

export const Subtext = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '19px',
  color: '$primary',
  margin: '0px 0px 0px 30px',

  variants: {
    color: {
      primary: {
        color: '$primary',
      },
      secondary: {
        color: '#777E90',
      },
    },
    margin: {
      left: {
        margin: '0px 0px 0px 15px',
      },
      right: {
        margin: '0px 30px 0px 0px',
      },
      rightAndLeft: {
        margin: '0px 8px',
      },
      topAndBottom: {
        margin: '30px 0px',
      },
      none: {
        margin: 0,
      },
    },
  },
});

export const Subheadings = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#777E90',
  margin: '0px 0px 15px',
});

export const CheckboxFilters = styled('div', {
  margin: '0px 0px 15px',
});

export const FilterButtonWrapper = styled('div', {
  width: '135px',
  height: '44px',

  '@md': {
    flex: '0.5',
  },

  button: {
    fontWeight: '500',
  },
});

export const CollapseIcon = styled(Icon, {
  color: '$mainTextColor',
  width: '24px',
  height: '24px',

  variants: {
    opened: {
      true: {
        '&:hover': {
          animation: `${openArrowBounce} 1600ms linear infinite`,
        },
      },
      false: {
        '&:hover': {
          animation: `${closeArrowBounce} 1600ms linear infinite`,
        },
      },
    },
  },
});

export const FilterHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  margin: '0',
  position: 'sticky',
  width: '100%',
  background: '$backgroundColor',
  top: '0',
  padding: '32px 20px 20px',
  zIndex: '5',

  '@md': {
    justifyContent: 'space-between',
    width: 'unset',
  },
});

export const FilterMobileActions = styled('div', {
  position: 'fixed',
  backgroundColor: '$backgroundColor',
  width: '100%',
  height: '5%',
  boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.08)',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '15px 0',
  bottom: '0',
  display: 'none',

  '@md': {
    display: 'flex',
  },
});

export const ButtonWrapper = styled('div', {
  flex: '0.5',

  '&:nth-child(1)': {
    marginRight: '10px',
    marginLeft: '15px',
  },

  '&:nth-child(2)': {
    marginRight: '15px',
  },
});

export const CloseIcon = styled(Icon, {
  color: '$mainTextColor',
});
