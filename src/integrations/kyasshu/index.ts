import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateEffect } from '../../hooks';

import {
  nftsActions,
  useAppDispatch,
  useFilterStore,
  usePlugStore,
} from '../../store';
import { parseAmountToE8SAsNum } from '../../utils/formatters';
import { useTraitsPayload, usePriceValues } from './utils';

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();
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

  const { sortBy } = useFilterStore();

  useUpdateEffect(() => {
    dispatch(nftsActions.clearLoadedNFTS());
  }, [traits, isMyNfts, priceValues, sortBy, status]);

  useEffect(() => {
    // Abort any pending request before proceeding
    if (currentAbortController) currentAbortController.abort();

    const abortController = new AbortController();

    setCurrentAbortController(abortController);

    dispatch(
      nftsActions.getNFTs({
        payload,
        sort: sortBy,
        order: 'd',
        page: 0,
        count: 25,
        abortController,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, traits, isMyNfts, priceValues, sortBy, status]);
};

export const useNFTDetailsFetcher = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    // TODO: handle the error gracefully when there is no id
    if (!id) return;

    dispatch(nftsActions.getNFTDetails({ id }));
  }, [dispatch, id]);
};

export { KyasshuUrl, type NSKyasshuUrl } from './kyasshu-urls';
