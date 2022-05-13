import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  nftsActions,
  useAppDispatch,
  useFilterStore,
  usePlugStore,
} from '../../store';
import { parseAmountToE8S } from '../../utils/formatters';
import { useTraitsPayload, usePriceValues } from './utils';

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();
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
              min: parseAmountToE8S(priceValues?.min),
              max: parseAmountToE8S(priceValues?.max),
              type: 'currentPrice',
            }
          : undefined,
    };
  }

  const { sortBy } = useFilterStore();

  useEffect(() => {
    console.log(payload);
    dispatch(
      nftsActions.getNFTs({
        payload,
        sort: sortBy,
        order: 'd',
        page: 0,
        count: 25,
      }),
    );
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
