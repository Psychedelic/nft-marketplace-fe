import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@stitches/react';

export const IconStyled = styled(FontAwesomeIcon, {
  fontSize: '18px',
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
  },
});
