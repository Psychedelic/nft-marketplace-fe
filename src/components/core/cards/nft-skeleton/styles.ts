import { styled } from '../../../../stitches.config';

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
});

export const SkeletonLarge = styled('div', {
  height: '200px',
  width: '100%',
  margin: '10px 0px',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  borderRadius: '14px',
  background: '$skeletonBackground',
});

export const SkeletonSmall = styled('div', {
  height: '15px',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  borderRadius: '24px',
  margin: '8px 0px 0px',
  background: '$skeletonBackground',
});
