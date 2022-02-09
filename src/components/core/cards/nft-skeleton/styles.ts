import { styled } from '../../../../stitches.config';

export const CardWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '#FFFFFF',
  border: '1.5px solid #E5E8EB',
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
    'linear-gradient(90deg, rgb(229, 232, 235) 0%, rgb(247, 248, 250) 59.9%)',
});

export const SkeletonSmall = styled('div', {
  height: '15px',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  borderRadius: '14px',
  margin: '8px 0px 0px',
  background:
    'linear-gradient(90deg, rgb(229, 232, 235) 0%, rgb(247, 248, 250) 59.9%)',
});
