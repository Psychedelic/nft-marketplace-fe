import { styled } from '../../stitches.config';

export const ListWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
  gridAutoFlow: 'row dense',
  gridGap: '35px 57px',
});
