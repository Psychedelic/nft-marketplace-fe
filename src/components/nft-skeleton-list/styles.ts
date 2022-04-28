import { styled } from '../../stitches.config';

export const ListWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(185px, 1fr))',
  gridAutoFlow: 'row dense',
  gridGap: '35px 50px',
});
