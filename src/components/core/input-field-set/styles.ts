import { styled } from '../../../stitches.config';

export const Container = styled('div', {
  // base styles
  position: 'relative',
  width: '100%',

  // variants
  variants: {
    name: {
      searchInput: {
        width: '600px',
        height: '44px',
      },
      filterInput: {
        width: '135px',
        height: '44px',
      },
      modalInput: {
        width: '430px',
        height: '56px',
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
  color: '#23262F',

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
        fontWeight: 600,
        lineHeight: '27px',
      },
    },
  },
});

export const SearchIcon = styled('img', {
  position: 'absolute',
  width: '16px',
  height: '16px',
  left: '0px',
  top: '0px',
  padding: '14px 16px',
});

export const AmountTypeContainer = styled('div', {
  position: 'absolute',
  top: '0px',
  right: '0px',
  width: '93px',
  height: '53px',
  background: '#FAFBFD',
  borderRadius: '0px 14px 14px 0px',
  border: '1.5px solid $borderColor',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const AmountTypeTitle = styled('div', {
  color: '#23262F',
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '22px',
});

export const AmountTypeIcon = styled('img', {
  width: '14px',
  height: '14px',
  marginRight: '5px',
});
