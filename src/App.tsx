import React from 'react';
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

const App = () => {
  const [theme, themeObject] = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  isDarkTheme(theme) && darkThemeGlobals();
  portalZIndexGlobals();

  // TODO: check balanceOf API response to show Alerts

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
