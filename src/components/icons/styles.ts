import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@stitches/react';

export const IconStyled = styled(FontAwesomeIcon, {
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
        transform: 'rotate(180deg)',
      },
    },
  },
});
