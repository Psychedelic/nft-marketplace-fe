import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, settingsActions } from '../store';

export const useLocationResolver = () => {
  const pathRef = useRef('/');
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    pathRef.current = pathname;
  }, [pathname]); // Only re-run if pathname changes

  // update store with previous pathname
  // (happens before update in useEffect above)
  const previousPathname = pathRef.current;
  useEffect(() => {
    dispatch(
      settingsActions.setPreviouslyVisitedPath(previousPathname),
    );
  }, [previousPathname]); // Only re-run if previousPathname changes
};
