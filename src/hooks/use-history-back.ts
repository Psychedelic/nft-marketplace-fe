import history from 'history/browser';
import { useNavigate } from 'react-router-dom';
import config from '../config/env';

export const useHistoryBack = () => {
  const navigate = useNavigate();

  const goBack = () =>
    (window.history.state.idx !== 0 && history.back()) ||
    navigate(`/${config.nftCollectionId}`);

  return goBack;
};
