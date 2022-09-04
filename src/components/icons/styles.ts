import { styled } from '@stitches/react';

export const IconWrapper = styled('span', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.1s ease-in-out',

  variants: {
    paddingLeft: {
      true: {
        paddingLeft: '0.5rem',
      },
    },
    paddingRight: {
      true: {
        paddingRight: '0.5rem',
      },
    },
    rotate: {
      true: {
        transform: 'rotate(-180deg)',
      },
    },
    size: {
      sm: {
        fontSize: '0.8rem',
      },
      md: {
        fontSize: '1.4rem',
      },
      lg: {
        fontSize: '1.8rem',
      },
    },
    colorType: {
      input: {
        color: '$textNeutralColor',
      },
      developerMode: {
        color: '$darkCyanBlue',
      },
    },
  },
});
