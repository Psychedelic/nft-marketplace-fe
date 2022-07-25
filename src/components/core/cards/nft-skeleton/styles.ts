import { styled } from '../../../../stitches.config';
import { SkeletonBox } from '../../skeleton';

export const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$backgroundColor',
  border: '1.5px solid $borderColor',
  boxSizing: 'border-box',
  boxShadow: '$default',
  borderRadius: '14px',
  width: '100%',
  height: '100%',
  padding: '10px',
  cursor: 'pointer',
  transition: 'all 0.5s ease-in-out',

  '@xs': {
    height: '450px',
  },
});

export const SkeletonLarge = styled(SkeletonBox, {
  height: '200px',
  width: '100%',
  margin: '10px 0px',

  '@xs': {
    flex: '1',
  },
});

export const SkeletonSmall = styled(SkeletonBox, {
  width: '100%',
  margin: '8px 0px 0px',
});
