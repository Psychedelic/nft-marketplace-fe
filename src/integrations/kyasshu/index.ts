import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateEffect } from '../../hooks';

import {
  nftsActions,
  useAppDispatch,
  useFilterStore,
  useNFTSStore,
} from '../../store';
import {
  useTraitsPayload,
  usePriceValues,
  getTraitPayloadData,
} from './utils';

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();
  const { collectionId } = useParams();

  const [currentAbortController, setCurrentAbortController] =
    useState<AbortController>();
  const { traits, isMyNfts, status } = useFilterStore();
  const traitsPayload = useTraitsPayload();
  const priceValues = usePriceValues();

  const { sortBy, reverse } = useFilterStore();
  const { lastIndexValue } = useNFTSStore();

  useUpdateEffect(() => {
    dispatch(nftsActions.clearLoadedNFTS());
  }, [traits, isMyNfts, priceValues, sortBy, status]);

  useEffect(() => {
    if (!collectionId) return;

    // Abort any pending request before proceeding
    if (currentAbortController) currentAbortController.abort();

    const abortController = new AbortController();

    setCurrentAbortController(abortController);
    if (isMyNfts) {
      dispatch(nftsActions.getMyNFTs({ collectionId }));
    } else {
      dispatch(
        nftsActions.getAllNFTs({
          traits: traitsPayload.length
            ? getTraitPayloadData(traitsPayload)
            : undefined,
          sort: sortBy,
          order: 'd',
          page: lastIndexValue,
          count: 25,
          collectionId,
          reverse,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    traits,
    isMyNfts,
    priceValues,
    sortBy,
    status,
    collectionId,
  ]);
};

export const useNFTDetailsFetcher = () => {
  const dispatch = useAppDispatch();
  const { id, collectionId } = useParams();

  useEffect(() => {
    // TODO: handle the error gracefully when there is no id
    if (!id || !collectionId) return;

    dispatch(nftsActions.getNFTDetails({ id, collectionId }));
  }, [dispatch, id, collectionId]);
};

export { KyasshuUrl, type NSKyasshuUrl } from './kyasshu-urls';
