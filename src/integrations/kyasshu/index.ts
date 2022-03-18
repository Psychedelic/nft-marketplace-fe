import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useFilterStore } from '../../store';
import { fetchNFTS, fetchNFTDetails } from './utils';

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
