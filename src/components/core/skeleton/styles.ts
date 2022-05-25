import { keyframes, styled } from '../../../stitches.config';

const fadeInOut = keyframes({
  '0%': {
    opacity: '1',
  },
  '50%': {
    opacity: '0.5',
  },
  '100%': {
    opacity: '1',
  },
});

export const SkeletonBox = styled('div', {
  width: '106px',
  height: '1.4rem',
  borderRadius: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.11)',
  background: '$skeletonBackground',
  animation: `${fadeInOut} 1.2s linear infinite`,
  transitionTimingFunction: 'ease-in-out',
  variants: {
    type: {
      small: {
        width: '85px',
      },
    },
  },
});
