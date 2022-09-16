import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateEffect } from '../../hooks';

import {
  nftsActions,
  useAppDispatch,
  useFilterStore,
  useNFTSStore,
  usePlugStore,
} from '../../store';
import { parseAmountToE8SAsNum } from '../../utils/formatters';
import { getSortValue } from '../../utils/sorting';
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
  const { principalId } = usePlugStore();
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
          payload,
          traits: traitsPayload.length
            ? getTraitPayloadData(traitsPayload)
            : undefined,
          sort: getSortValue(sortBy),
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
