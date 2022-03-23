import React from 'react';
import { NftCard } from '../core/cards/nft-card';
import { NftSkeletonList } from '../nft-skeleton-list';
import { InfiniteScrollWrapper } from './styles';

import {
  useNFTSStore,
  useAppDispatch,
  useFilterStore,
  usePlugStore,
} from '../../store';
import { fetchNFTS } from '../../integrations/kyasshu/utils';

export const NftList = () => {
  // eslint-disable-next-line
  const { loadedNFTS, hasMoreNFTs, loadingNFTs, nextPageNo } =
    useNFTSStore();
  const { isConnected } = usePlugStore();
  const {  } = useFilterStore();

  const dispatch = useAppDispatch();

  const { sortBy } = useFilterStore();

  const loadMoreNFTS = () => {
    if (loadingNFTs || !hasMoreNFTs) return;

    fetchNFTS({
      dispatch,
      sort: sortBy,
      order: 'd',
      page: nextPageNo,
      count: '25',
    });
  };

  return (
    <InfiniteScrollWrapper
      pageStart={0}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      loadMore={nextPageNo > 0 ? loadMoreNFTS : () => {}}
      hasMore={hasMoreNFTs}
      loader={<NftSkeletonList />}
      useWindow={true || false}
      threshold={250 * 5}
      className="infinite-loader"
    >
      {isConnected && loadedNFTS?.map((nft) => (
        <NftCard data={nft} key={nft.id} />
      ))}
    </InfiniteScrollWrapper>
  );
};
