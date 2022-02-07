import { styled } from '../../stitches.config';

export const ListWrapper = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  columnGap: '3%',
  rowGap: '5%',
});
