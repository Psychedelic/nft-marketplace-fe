import { styled } from '../../stitches.config';

export const Container = styled('div', {
  position: 'relative',
  // borderTop: '1px solid rgb(229, 232, 235)',
  borderTop: '1px solid $borderColor',
  padding: '0px 80px 80px',
  width: '100%',
  // borderLeft: '1px solid rgb(229, 232, 235)',
  borderLeft: '1px solid $borderColor',

  '@sm': {
    padding: '0px 15px 15px',
  },
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
  flexWrap: 'wrap',
});

export const SkeletonListWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(185px, 1fr))',
  gridAutoFlow: 'row dense',
  gridGap: '35px 50px',
});
