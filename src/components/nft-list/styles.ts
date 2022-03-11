import InfiniteScroll from 'react-infinite-scroller';
import { styled } from '../../stitches.config';

export const InfiniteScrollWrapper = styled(InfiniteScroll, {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill,minmax(185px, 1fr))',
  gridAutoFlow: 'row dense',
  gridGap: '35px 50px',
});
