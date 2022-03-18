import { useEffect } from 'react';

import { useAppDispatch, useFilterStore, usePlugStore } from '../../store';
import { fetchNFTS } from './utils';

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

  useEffect(() => {
    fetchNFTS({
      payload,
      dispatch,
      sort: 'lastModified',
      order: 'd',
      page: 0,
      count: '25',
    });
  }, [dispatch, traits, isMyNfts, priceValues]);
};
