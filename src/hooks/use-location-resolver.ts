import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, settingsActions } from '../store';

export const useLocationResolver = () => {
  const pathRef = useRef('/');
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [previousPathname, setPreviousPathname] =
    useState<string>('/');

  useEffect(() => {
    pathRef.current = pathname;
    dispatch(settingsActions.setIsVisitedPath(pathname));
  }, [pathname]); // Only re-run if pathname changes

  // update store with previous pathname
  // (happens before update in useEffect above)
  useEffect(() => {
    dispatch(
      settingsActions.setPreviouslyVisitedPath(previousPathname),
    );
    setPreviousPathname(pathRef.current);
  }, [dispatch, pathname]); // Only re-run if pathname changes
};
