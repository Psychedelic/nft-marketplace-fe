import * as HoverCard from '@radix-ui/react-hover-card';
import { styled } from '../../../stitches.config';

export const Button = styled('button', {
  variants: {
    backgroundColor: {
      filled: {
        backgroundColor: '#2253FF',
        fontWeight: '800',
        color: '#FCFCFD',
        border: 'none',
      },
      notfilled: {
        backgroundColor: 'transparent',
        color: '#23262F',
      },
    },
    outline: {
      solid: {
        background: 'transparent',
        border: '2px solid #2253FF',
        fontWeight: '800',
        color: '#2253FF',
      },
      light: {
        border: '2px solid #E5E8EB',
        background: 'transparent',
        fontWeight: '800',
        color: '#23262F',
      },
      text: {
        bold: {
          fontWeight: '800',
          color: 'pink',
        },
      },
    },
  },
  cursor: 'pointer',
  borderRadius: '14px',
  fontSize: '14px',
  padding: '10px 20px',
});

export const ConnectToPlugButton = styled(HoverCard.Content, {
  minWidth: '220px',
  backgroundColor: 'white',
  border: '2px solid #E5E8EB',
  boxSizing: 'border-box',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
  },
  borderRadius: '15px',
  marginTop: '5%',
  padding: '0',

  '& div:nth-child(2)': {
    height: '1px',
    background: '#E5E8EB',
  },
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  position: 'relative',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '19px',
  color: '#23262F',
  cursor: 'pointer',

  '& img': {
    marginRight: '15px',
  },

  '& p': {
    margin: '0px',
  },
});
