import * as PopoverPrimitive from '@radix-ui/react-popover';
import { styled, keyframes } from '../../../stitches.config';
import { Icon } from '../../icons';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

export const StyledContent = styled(PopoverPrimitive.Content, {
  borderRadius: '14px',
  width: 290,
  backgroundColor: '$defaultBackgroundColour',
  color: '$defaultTxtColour',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
    position: 'absolute',
    right: '-500px',
    top: '-100px',
  },
});

export const StyledCloseIconWrapper = styled(PopoverPrimitive.Close, {
  background: 'black',
  cursor: 'pointer',
});

export const StyledCloseIcon = styled(Icon, {
  justifyContent: 'flex-end',
});

export const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 20px 10px',
  boxShadow: '0px 4px 4px rgba(96, 96, 96, 0.25)',
});

export const Title = styled('p', {
  margin: '0',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  color: '#ffffff',
});

export const PopoverContent = styled('div', {
  padding: '0px 20px',
});

export const ButtonContainer = styled('div', {
  background: '$darkBlueMagenta',
  height: '60px',
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  padding: '0px 10px',
  borderBottomRightRadius: '14px',
  borderBottomLeftRadius: '14px',
});

export const Flex = styled('div', {
  display: 'flex',
});

export const ButtonWrapper = styled('div', {
  fontSize: '14px',

  variants: {
    margin: {
      right: {
        marginRight: '10px',
      },
    },
  },
});
