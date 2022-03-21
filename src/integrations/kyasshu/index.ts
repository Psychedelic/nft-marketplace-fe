import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useFilterStore, usePlugStore } from '../../store';
import { fetchNFTS, fetchNFTDetails, useTraitsPayload, usePriceValues } from './utils';

// eslint-disable-next-line object-curly-newline
export default {};

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();
  const { traits, isMyNfts, status } = useFilterStore();
  const { principalId } = usePlugStore();
  const traitsPayload = useTraitsPayload();
  const priceValues = usePriceValues();
  // eslint-disable-next-line object-curly-newline
  let payload = {};
  if (traitsPayload.length || isMyNfts || (priceValues && Object.keys(priceValues).length) || status !== '') {
    payload = {
      traits: traitsPayload.length ? traitsPayload : undefined,
      principal: isMyNfts ? principalId : undefined,
      status: status !== '' ? status : undefined,
      price: priceValues && Object.keys(priceValues).length ? {
        min: priceValues?.min,
        max: priceValues?.max,
      } : undefined,
    };
  }

  const { sortBy } = useFilterStore();

  useEffect(() => {
    fetchNFTS({
      payload,
      dispatch,
      sort: sortBy,
      order: 'd',
      page: 0,
      count: '25',
    });

    console.log(payload);
  }, [dispatch, traits, isMyNfts, priceValues, sortBy, status]);
};

export const useNFTDetailsFetcher = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    // TODO: handle the error gracefully when there is no id
    if (!id) return;

    fetchNFTDetails({
      dispatch,
      id,
    });
  }, [dispatch, id]);
};
