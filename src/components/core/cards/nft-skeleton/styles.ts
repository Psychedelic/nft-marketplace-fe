import { styled } from '../../../../stitches.config';

export const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$backgroundColor',
  border: '1.5px solid $borderColor',
  boxSizing: 'border-box',
  boxShadow: '0px 0px 8px #E6E9EF',
  borderRadius: '14px',
  width: '100%',
  height: '100%',
  padding: '10px',
  cursor: 'pointer',
  transition: 'all 0.5s ease-in-out',

  '&:hover': {
    boxShadow: '0px 0px 8px 3px #E6E9EF',
    transform: 'scale(1.015)',
  },
});

export const SkeletonLarge = styled('div', {
  height: '220px',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  borderRadius: '14px',
  background:
    '$skeletonBackground',
});

export const SkeletonSmall = styled('div', {
  height: '15px',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  borderRadius: '14px',
  margin: '8px 0px 0px',
  background: '$skeletonBackground',
});
