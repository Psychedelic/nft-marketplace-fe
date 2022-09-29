import history from 'history/browser';
import { useNavigate, useParams } from 'react-router-dom';

export const useHistoryBack = () => {
  const navigate = useNavigate();
  // TODO: Confirm its work as this was a replacement of hard typed value
  // but was not fully tested, but expected to work given useParams...
  const { collectionId } = useParams();

  const goBack = () =>
    (window.history.state.idx !== 0 && history.back()) ||
    navigate(`/${collectionId}`);

  return goBack;
};

