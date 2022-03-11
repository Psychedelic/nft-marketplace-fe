import React from 'react';
import { NftCard } from '../core/cards/nft-card';
import { NftSkeletonList } from '../nft-skeleton-list';
import { InfiniteScrollWrapper } from './styles';

import { useNFTSStore, useAppDispatch } from '../../store';
import { fetchNFTS } from '../../integrations/kyasshu/utils';

export const NftList = () => {
  // eslint-disable-next-line
  const { loadedNFTS, hasMoreNFTs, loadingNFTs, nextPageNo } =
    useNFTSStore();

  const dispatch = useAppDispatch();

  const loadMoreNFTS = () => {
    if (loadingNFTs || !hasMoreNFTs) return;

    fetchNFTS({
      dispatch,
      sort: 'lastModified',
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
      {loadedNFTS?.map((nft) => (
        <NftCard data={nft} key={nft.id} />
      ))}
    </InfiniteScrollWrapper>
  );
};
