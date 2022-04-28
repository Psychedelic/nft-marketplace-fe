import { styled, keyframes } from '../../../stitches.config';

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});

export const Container = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '15px',
});

export const PendingLogo = styled('img', {
  width: '112px',
  height: '112px',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${spin} 4000ms infinite linear`,
  },
});

export const CompletedLogo = styled('img', {
  width: '114px',
  height: '114px',
});
