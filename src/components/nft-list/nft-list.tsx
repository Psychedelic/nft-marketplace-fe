import React, { useState, useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NftCard } from '../core/cards/nft-card';
import { NftSkeletonList } from '../nft-skeleton-list';
import { InfiniteScrollWrapper } from './styles';
import {
  useNFTSStore,
  useFilterStore,
  useAppDispatch,
  usePlugStore,
  nftsActions,
  useSettingsStore,
} from '../../store';
import { EmptyState } from '../core';
import { ButtonType } from '../../constants/empty-states';
import {
  usePriceValues,
  useTraitsPayload,
  isNFTOwner,
} from '../../integrations/kyasshu/utils';
import { parseAmountToE8SAsNum } from '../../utils/formatters';
import { calculateGridGap } from '../../utils/styles';

export const NftList = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line
  const dispatch = useAppDispatch();

  const [gridGap, setGridGap] = useState('35px 57px');

  const gridContainerRef = useRef<HTMLDivElement>(null);

  const { collapsed: filtersCollapsed } = useSettingsStore();

  const { loadedNFTS, hasMoreNFTs, loadingNFTs, nextPageNo } =
    useNFTSStore();
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
    if (loadingNFTs || !hasMoreNFTs) return;

    dispatch(
      nftsActions.getNFTs({
        payload,
        sort: sortBy,
        order: 'd',
        page: nextPageNo,
        count: 25,
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
    defaultFilters.length &&
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

  if (isMyNfts && isConnected && !loadedNFTS.length) {
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

  useLayoutEffect(() => {
    const scrollEvent = () => {
      if (!gridContainerRef?.current?.clientWidth) return;

      setGridGap(
        calculateGridGap(gridContainerRef.current.clientWidth),
      );
    };

    scrollEvent();

    window.addEventListener('resize', scrollEvent);
    return () => window.removeEventListener('resize', scrollEvent);
  }, [filtersCollapsed]);

  return (
    <div ref={gridContainerRef}>
      <InfiniteScrollWrapper
        pageStart={0}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        loadMore={nextPageNo > 0 ? loadMoreNFTS : () => {}}
        hasMore={hasMoreNFTs}
        loader={<NftSkeletonList />}
        useWindow={true || false}
        threshold={250 * 5}
        className="infinite-loader"
        style={{ gap: `${gridGap}` }}
      >
        {loadedNFTS?.map((nft) => (
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
      </InfiniteScrollWrapper>
    </div>
  );
};
