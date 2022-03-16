import { useEffect } from 'react';

import { useAppDispatch } from '../../store';
import { fetchNFTS, fetchNFTDetails } from './utils';

// eslint-disable-next-line object-curly-newline
export default {};

export const useNFTSFetcher = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchNFTS({
      dispatch,
      sort: 'lastModified',
      order: 'd',
      page: 0,
      count: '25',
    });
  }, [dispatch]);
};

export const useNFTDetailsFetcher = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchNFTDetails({
      dispatch,
      id: '141',
    });
  }, [dispatch]);
};
