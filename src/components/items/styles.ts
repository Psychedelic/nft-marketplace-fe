import { styled } from '../../stitches.config';

export const Container = styled('div', {
  borderTop: '1px solid rgb(229, 232, 235)',
  padding: '0px 80px 80px',
});

export const FilteredContainer = styled('div', {
  maxWidth: '1280px',
  margin: 'auto',
});

export const ContentWrapper = styled('div', {
  margin: '25px 0px 15px',
});

export const Flex = styled('div', {
  // base styles
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  // variants
  variants: {
    withMargin: {
      true: {
        margin: '25px 0 10px',
      },
    },

    justifyContent: {
      true: {
        justifyContent: 'space-between',
      },
    },
  },
});

export const ContentFlex = styled('div', {
  display: 'flex',
  alignItems: 'center',
});
