import { styled } from '../../../stitches.config';
import { Icon } from '../../icons';

export const Container = styled('div', {
  // base styles
  position: 'relative',
  width: '100%',

  // variants
  variants: {
    name: {
      searchInput: {
        width: '100%',
        maxWidth: '600px',
        height: '44px',
      },
      filterInput: {
        width: '135px',
        height: '44px',
      },
      modalInput: {
        width: '430px',
        height: '56px',

        '@sm': {
          margin: '0px 15px',
        },
      },
    },
  },
});

export const Input = styled('input', {
  // base styles
  all: 'unset',
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 14,
  fontSize: 16,
  lineHeight: 1,
  color: '$mainTextColor',

  border: '1.5px solid $borderColor',
  boxSizing: 'border-box',

  // variants
  variants: {
    name: {
      searchInput: {
        padding: '13px 16px 13px 44px',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '19px',

        '@md': {
          padding: '0px 0px 0px 15px',
        },
      },
      filterInput: {
        padding: '13px 16px',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '19px',
      },
      modalInput: {
        padding: '15px 116px 15px 21px',
        fontSize: '22px',
        fontWeight: 500,
        lineHeight: '27px',
      },
    },
    error: {
      true: {
        borderColor: '1.5px solid $error',
        color: '$error',
      },
    },
    isMobileScreen: {
      true: {
        border: 'none',

        '&:focus': {
          outline: 'unset !important',
        },
      },
    },
  },
});

export const SearchIcon = styled(Icon, {
  color: '$mainTextColor',
  position: 'absolute',
  width: '16px',
  height: '16px',
  left: '0px',
  top: '0px',
  padding: '14px 16px',

  variants: {
    isMobileScreen: {
      true: {
        display: 'none',
      },
    },
  },
});

export const AmountTypeContainer = styled('div', {
  position: 'absolute',
  top: '0px',
  bottom: '0px',
  right: '0px',
  width: '93px',
  background: '$tableBackgroundColor',
  borderRadius: '0px 14px 14px 0px',
  border: '1.5px solid $borderColor',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$mainTextColor',
});

export const AmountTypeTitle = styled('div', {
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '22px',
});

export const AmountTypeIcon = styled('img', {
  width: '14px',
  height: '14px',
  marginRight: '5px',
});
