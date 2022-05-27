import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
});

export const CollectionWrapper = styled('div', {
  paddingTop: '72px',

  // variants
  variants: {
    showAlerts: {
      true: {
        paddingTop: '110px',
      },
    },
  },
});
