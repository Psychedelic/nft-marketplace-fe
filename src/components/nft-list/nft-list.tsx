import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroller';
import { NftCard } from '../core/cards/nft-card';
import {
  useNFTSStore,
  useFilterStore,
  useAppDispatch,
  usePlugStore,
  nftsActions,
} from '../../store';
import { EmptyState, NftSkeleton, VirtualizedGrid } from '../core';
import { ButtonType } from '../../constants/empty-states';
import {
  usePriceValues,
  useTraitsPayload,
  isNFTOwner,
} from '../../integrations/kyasshu/utils';
import { parseAmountToE8SAsNum } from '../../utils/formatters';

export const NftList = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line
  const dispatch = useAppDispatch();
  const { loadedNFTS, hasMoreNFTs, loadingNFTs, nextPageNo } =
    useNFTSStore();
  const { collectionId } = useParams();
  const { isMyNfts, status, defaultFilters } = useFilterStore();
  const { principalId, isConnected } = usePlugStore();
  const traitsPayload = useTraitsPayload();
  const priceValues = usePriceValues();
  // eslint-disable-next-line object-curly-newline
  let payload = {};
  if (
    traitsPayload.length ||
    isMyNfts ||
    (priceValues && Object.keys(priceValues).length) ||
    status !== ''
  ) {
    payload = {
      traits: traitsPayload.length ? traitsPayload : undefined,
      principal: isMyNfts ? principalId : undefined,
      status,
      price:
        priceValues && Object.keys(priceValues).length
          ? {
              min: parseAmountToE8SAsNum(priceValues?.min),
              max: parseAmountToE8SAsNum(priceValues?.max),
              type: 'currentPrice',
            }
          : undefined,
    };
  }

  const { sortBy } = useFilterStore();

  const loadMoreNFTS = () => {
    if (
      loadingNFTs ||
      !hasMoreNFTs ||
      nextPageNo <= 0 ||
      !collectionId
    )
      return;

    dispatch(
      nftsActions.getAllNFTs({
        payload,
        sort: sortBy,
        order: 'd',
        page: nextPageNo,
        count: 25,
        collectionId,
      }),
    );
  };

  if (isMyNfts && !isConnected) {
    return (
      <EmptyState
        message={`${t('translation:emptyStates.connectMessage')}`}
        buttonType={ButtonType.plug}
      />
    );
  }

  if (
    isMyNfts &&
    isConnected &&
    defaultFilters.length > 1 &&
    !loadedNFTS.length
  ) {
    return (
      <EmptyState
        message={`${t(
          'translation:emptyStates.noOwnedFilteredNfts',
        )}`}
        buttonText={`${t(
          'translation:emptyStates.noFilteredNftsAction',
        )}`}
      />
    );
  }

  if (
    isMyNfts &&
    isConnected &&
    !loadedNFTS.length &&
    defaultFilters.length === 1
  ) {
    return (
      <EmptyState
        message={`${t('translation:emptyStates.noNfts')}`}
        buttonText={`${t('translation:emptyStates.noNftsAction')}`}
      />
    );
  }

  if (defaultFilters.length && !loadedNFTS.length) {
    return (
      <EmptyState
        message={`${t('translation:emptyStates.noFilteredNfts')}`}
        buttonText={`${t('translation:emptyStates.noNftsAction')}`}
      />
    );
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMoreNFTS}
      hasMore={hasMoreNFTs}
      useWindow
      threshold={500}
      className="infinite-loader"
    >
      <VirtualizedGrid
        loadingMore={hasMoreNFTs}
        items={loadedNFTS}
        ItemRenderer={React.memo((nft) => (
          <NftCard
            data={nft}
            key={nft.id}
            owned={isNFTOwner({
              isConnected,
              owner: nft?.owner,
              principalId,
            })}
          />
        ))}
        Skeleton={NftSkeleton}
      />
    </InfiniteScroll>
  );
};
