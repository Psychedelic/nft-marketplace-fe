import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled } from '@stitches/react';

export const IconStyled = styled(FontAwesomeIcon, {
  padding: '0 0.5rem',

  variants: {
    noPadding: {
      true: {
        padding: '0',
      },
    },
  },
});
