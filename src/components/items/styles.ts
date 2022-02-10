import { styled } from '../../stitches.config';

export const Container = styled('div', {
  position: 'relative',
  borderTop: '1px solid rgb(229, 232, 235)',
  padding: '0px 80px 80px',
  width: '100%',
  borderLeft: '1px solid rgb(229, 232, 235)',
});

export const CloseFilterContainer = styled('div', {
  position: 'absolute',
  left: '-22px',
  top: '24px',
});

export const FilteredContainer = styled('div', {
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
