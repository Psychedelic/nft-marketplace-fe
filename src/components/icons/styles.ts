import { styled } from '@stitches/react';

export const IconWrapper = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  transition: 'transform 0.1s ease-in-out',

  variants: {
    paddingLeft: {
      true: {
        paddingLeft: '0.8rem',
      },
    },
    paddingRight: {
      true: {
        paddingRight: '0.8rem',
      },
    },
    rotate: {
      true: {
        transform: 'rotate(-180deg)',
      },
    },
    size: {
      false: {
        width: '1.4rem',
      },
      sm: {
        fontSize: '1.0rem',
      },
      md: {
        fontSize: '1.4rem',
      },
      lg: {
        fontSize: '1.8rem',
      },
    },
  },
});
