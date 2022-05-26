import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar, ToastHandler, Alerts } from './components';
import CollectionView from './views/CollectionView';
import NFTView from './views/NFTView';
import OfferView from './views/OffersView';
import { useTheme } from './hooks/use-theme';
import {
  darkThemeGlobals,
  isDarkTheme,
  portalZIndexGlobals,
} from './utils/styles';
import { ThemeRootElement } from './constants/common';
import {
  useAppDispatch,
  usePlugStore,
  marketplaceActions,
} from './store';

const App = () => {
  const dispatch = useAppDispatch();
  const { isConnected, principalId: plugPrincipal } = usePlugStore();
  const [theme, themeObject] = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isDarkTheme(theme) && darkThemeGlobals();
  portalZIndexGlobals();

  useEffect(() => {
    if (!isConnected || !plugPrincipal) return;

    dispatch(
      marketplaceActions.getAssetsToWithdraw({
        userPrincipalId: plugPrincipal,
      }),
    );
  }, [dispatch, isConnected, plugPrincipal]);

  return (
    <div className={themeObject} id={ThemeRootElement}>
      <BrowserRouter>
        <Alerts />
        <NavBar />
        <Routes>
          <Route path="/" element={<CollectionView />}>
            <Route path="/activity" />
          </Route>
          <Route path="/nft/:id" element={<NFTView />} />
          <Route path="/offers/:id" element={<OfferView />} />
        </Routes>
      </BrowserRouter>
      <ToastHandler />
    </div>
  );
};

export default App;
