import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { styled, keyframes } from '../../../stitches.config';

const slideUpAndFade = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(2px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const slideRightAndFade = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(-2px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const slideDownAndFade = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateY(-2px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateY(0)',
  },
});

const slideLeftAndFade = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translateX(2px)',
  },
  '100%': {
    opacity: 1,
    transform: 'translateX(0)',
  },
});

const boxShadowOne = 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px';
const boxShadowTwo = 'hsl(206 22% 7% / 20%) 0px 10px 20px -15px';

export const StyledContent = styled(TooltipPrimitive.Content, {
  borderRadius: 4,
  padding: '10px 15px',
  fontSize: 15,
  lineHeight: 1,
  color: '$defaultTxtColour',
  backgroundColor: '$defaultBackgroundColour',
  boxShadow: `${boxShadowOne}, ${boxShadowTwo}`,
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '100ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="delayed-open"]': {
      '&[data-side="top"]': {
        animationName: slideDownAndFade,
      },
      '&[data-side="right"]': {
        animationName: slideLeftAndFade,
      },
      '&[data-side="bottom"]': {
        animationName: slideUpAndFade,
      },
      '&[data-side="left"]': {
        animationName: slideRightAndFade,
      },
    },
  },

  variants: {
    type: {
      traits: {
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 5px',
        borderRadius: '14px',
        height: '25px',
      },
    },
  },
});

export const StyledArrow = styled(TooltipPrimitive.Arrow, {
  fill: '$defaultBackgroundColour',
});
