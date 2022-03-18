import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useFilterStore, usePlugStore } from '../../store';
import { fetchNFTS, fetchNFTDetails } from './utils';

// eslint-disable-next-line object-curly-newline
export default {};

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();
  const { traits, isMyNfts, defaultFilters } = useFilterStore();
  const { principalId } = usePlugStore();
  const traitsPayload = traits.filter(
    (trait) => trait?.values?.length,
  );
  const priceValues = defaultFilters.find(({ filterCategory }) => filterCategory === 'Price Range')?.filterName;
  // eslint-disable-next-line object-curly-newline
  let payload = {};
  if (traitsPayload.length || isMyNfts || (priceValues && Object.keys(priceValues).length)) {
    payload = {
      traits: traitsPayload.length ? traitsPayload : undefined,
      principal: isMyNfts ? principalId : undefined,
      status: 'unlisted', // TO-DO: add to conditional statement
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
  }, [dispatch, traits, isMyNfts, priceValues, sortBy]);
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
