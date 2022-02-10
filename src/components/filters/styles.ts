import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '340px',
  background: 'white',
  height: '100%',
  padding: '40px 20px 30px',
  borderTop: '1px solid #E5E8EB',
  position: 'relative',
});

export const CloseFilterContainer = styled('div', {
  position: 'absolute',
  right: '-22px',
  top: '24px',
  zIndex: 1,
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  margin: '0 0 12%',

  variants: {
    justify: {
      spaceBetween: {
        justifyContent: 'space-between',
      },
    },
  },
});

export const Heading = styled('h5', {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '22px',
  lineHeight: '27px',
  color: '#23262F',
  margin: 0,
});

export const Subtext = styled('p', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '19px',
  color: '#2253FF',
  margin: '0px 0px 0px 30px',
  cursor: 'pointer',

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
        margin: '0px 0px 0px 30px',
      },
      right: {
        margin: '0px 30px 0px 0px',
      },
      rightAndLeft: {
        margin: '0px 15px',
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
  fontSize: '14px',
  lineHeight: '19px',
  color: '#777E90',
  margin: '20px 0px',
});

export const CheckboxFilters = styled('div', {
  margin: '20px 0px',
});
