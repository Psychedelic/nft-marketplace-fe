import { styled } from '../../stitches.config';

export const Container = styled('div', {
  position: 'relative',
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
  overflow: 'scroll',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

export const FiltersWrapper = styled('div', {
  padding: '32px 20px',
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
  color: '#2253FF',
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
  color: '#2253FF',
  margin: '0px 0px 0px 30px',

  variants: {
    color: {
      primary: {
        color: '#2253FF',
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

  // '.checkbox-accordian': {
  //   marginBottom: '0px',
  // },
});

export const FilterButtonWrapper = styled('div', {
  width: '135px',
  height: '44px',

  button: {
    fontWeight: '500',
  },
});
