import React from 'react';
import { NftCard } from '../core/cards/nft-card';
import { NftSkeletonList } from '../nft-skeleton-list';
import { InfiniteScrollWrapper } from './styles';

import {
  useNFTSStore,
  useFilterStore,
  useAppDispatch,
  usePlugStore,
} from '../../store';
import { fetchNFTS, usePriceValues, useTraitsPayload } from '../../integrations/kyasshu/utils';

export const NftList = () => {
  // eslint-disable-next-line
  const { loadedNFTS, hasMoreNFTs, loadingNFTs, nextPageNo } =
    useNFTSStore();
  const dispatch = useAppDispatch();
  const { isMyNfts, status } = useFilterStore();
  const { principalId } = usePlugStore();
  const traitsPayload = useTraitsPayload();
  const priceValues = usePriceValues();
  // eslint-disable-next-line object-curly-newline
  let payload = {};
  if (
    traitsPayload.length || isMyNfts || (priceValues && Object.keys(priceValues).length) || status !== '') {
    payload = {
      traits: traitsPayload.length ? traitsPayload : undefined,
      principal: isMyNfts ? principalId : undefined,
      status: status !== '' ? status : undefined,
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
