import { useEffect } from 'react';

import { useAppDispatch, useFilterStore } from '../../store';
import { fetchNFTS } from './utils';

// eslint-disable-next-line object-curly-newline
export default {};

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();

  const { sortBy } = useFilterStore();

  useEffect(() => {
    fetchNFTS({
      dispatch,
      sort: sortBy,
      order: 'd',
      page: 0,
      count: '25',
    });
  }, [dispatch, sortBy]);
};
