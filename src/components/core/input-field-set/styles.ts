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
  border: '1.5px solid #E5E8EB',
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
        padding: '15px 21px',
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
