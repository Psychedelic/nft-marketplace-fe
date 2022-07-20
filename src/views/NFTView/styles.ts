import { styled } from '../../stitches.config';

export const Container = styled('div', {
  width: '100%',
  paddingTop: '72px',
  background: '$backgroundColor',

  // variants
  variants: {
    showAlerts: {
      true: {
        paddingTop: '110px',
      },
    },
  },
});

export const NFTDetailsWrapper = styled('div', {
  maxWidth: '1190px',
  margin: 'auto',
  padding: '10px 30px 30px',

  '@sm': {
    padding: '10px 0px 0px',
  },
});
