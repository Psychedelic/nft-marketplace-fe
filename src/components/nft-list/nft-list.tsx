import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { NftCard } from '../core/cards/nft-card';
import {
  useNFTSStore,
  useFilterStore,
  useAppDispatch,
  usePlugStore,
  nftsActions,
  RootState,
} from '../../store';
import { EmptyState, NftSkeleton, VirtualizedGrid } from '../core';
import { ButtonType } from '../../constants/empty-states';
import {
  useTraitsPayload,
  isNFTOwner,
  getTraitPayloadData,
} from '../../integrations/kyasshu/utils';

export const NftList = () => {
  const { t } = useTranslation();
  // eslint-disable-next-line
  const dispatch = useAppDispatch();
  const {
    loadedNFTS,
    hasMoreNFTs,
    loadingNFTs,
    nextPageNo,
    lastIndexValue,
  } = useNFTSStore();
  const { collectionId } = useParams();
  const { isMyNfts, defaultFilters, reverse } = useFilterStore();
  const { principalId, isConnected } = usePlugStore();

  const collectionDetails = useSelector(
    (state: RootState) => state.marketplace.currentCollectionDetails,
  );

  const myNFTIds = useSelector(
    (state: RootState) => state.nfts.myNFTIds,
  );

  const traitsPayload = useTraitsPayload();

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
        traits: traitsPayload.length
          ? getTraitPayloadData(traitsPayload)
          : undefined,
        sort: sortBy,
        order: 'd',
        lastIndex: lastIndexValue && BigInt(lastIndexValue),
        count: 25,
        collectionId,
        reverse,
        page: nextPageNo,
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

  if (!loadedNFTS.length) {
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
              myNFTIds,
              currentNFTId: nft.id,
            })}
            collectionDetails={collectionDetails}
          />
        ))}
        Skeleton={NftSkeleton}
      />
    </InfiniteScroll>
  );
};
