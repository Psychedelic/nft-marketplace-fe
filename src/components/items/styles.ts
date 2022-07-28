import { styled } from '../../stitches.config';
import { SkeletonBox } from '../core';

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
    overflowX: 'hidden',
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
      spaceBetween: {
        justifyContent: 'space-between',
      },
      center: {
        justifyContent: 'center',
      },
    },
  },
});

export const ContentFlex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: '10px',

  variants: {
    mobileBtns: {
      true: {
        '@sm': {
          flex: '1',
        },
      },
    },
  },
});

export const SkeletonListWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(185px, 1fr))',
  gridAutoFlow: 'row dense',
  gridGap: '35px 50px',

  '@sm': {
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px',
  },

  '@xs': {
    gridTemplateColumns: '1fr',
  },
});

export const ClearButton = styled('div', {
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '19px',
  color: '$primary',

  '&:hover': {
    cursor: 'pointer',
  },
});

export const AppliedFilters = styled('span', {
  width: '18px',
  height: '18px',
  borderRadius: '100%',
  background: '$primary',
  color: '#ffffff',
  fontSize: '12px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '10px',
});

export const FiltersButtonSkeleton = styled(SkeletonBox, {
  width: '100%',
  height: '100%',
  minHeight: '41px',
});

export const SortButtonSkeleton = styled(SkeletonBox, {
  width: '100%',
  height: '100%',
  minHeight: '41px',
  marginLeft: '10px',
});
