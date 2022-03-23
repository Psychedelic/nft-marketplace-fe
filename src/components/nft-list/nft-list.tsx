import React, { useEffect } from 'react';
import { NftCard } from '../core/cards/nft-card';
import { NftSkeletonList } from '../nft-skeleton-list';
import { InfiniteScrollWrapper } from './styles';

import {
  useNFTSStore,
  useFilterStore,
  useAppDispatch,
  usePlugStore,
  filterActions,
} from '../../store';
import { fetchNFTS, usePriceValues, useTraitsPayload } from '../../integrations/kyasshu/utils';
import { EmptyState } from '../core';

export const NftList = () => {
  // eslint-disable-next-line
  const dispatch = useAppDispatch();
  const { loadedNFTS, hasMoreNFTs, loadingNFTs, nextPageNo } = useNFTSStore();
  const { isMyNfts, status } = useFilterStore();
  const { principalId, isConnected } = usePlugStore();
  const traitsPayload = useTraitsPayload();
  const priceValues = usePriceValues();
  // eslint-disable-next-line object-curly-newline
  let payload = {};
  if (
    traitsPayload.length || isMyNfts || (priceValues && Object.keys(priceValues).length) || status !== '') {
    payload = {
      traits: traitsPayload.length ? traitsPayload : undefined,
      principal: isMyNfts ? principalId : undefined,
      status,
      price:
        priceValues && Object.keys(priceValues).length
          ? {
            min: priceValues?.min,
            max: priceValues?.max,
          }
          : undefined,
    };
  }

  const { sortBy } = useFilterStore();

  const loadMoreNFTS = () => {
    if (loadingNFTs || !hasMoreNFTs) return;

    fetchNFTS({
      payload,
      dispatch,
      sort: sortBy,
      order: 'd',
      page: nextPageNo,
      count: '25',
    });
  };

  if (isMyNfts && !isConnected) {
    return <EmptyState message="Connect to see your NFT’s" buttonType="plug" />;
  }

  if (isMyNfts && isConnected && !loadedNFTS.length) {
    return <EmptyState message="You don’t own any NFT’s yet" buttonText="Browse NFT’s for Sale" />;
  }

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
