import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { NftCard } from '../core/cards/nft-card';
import { NftSkeletonList } from '../nft-skeleton-list';
import { ListWrapper } from './styles';

import { useNFTSStore } from '../../store';

export const NftList = () => {
  const { loadedNFTS } = useNFTSStore();

  return (
    <ListWrapper>
      <InfiniteScroll
        pageStart={0}
        hasMore={true || false}
        loader={<NftSkeletonList />}
        useWindow={false}
        className="infinite-loader"
      >
        {loadedNFTS.map((nft) => (
          <NftCard data={nft} key={nft.id} />
        ))}
      </InfiniteScroll>
    </ListWrapper>
  );
};
