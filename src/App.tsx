import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar, ToastHandler, Alerts } from './components';
import CollectionView from './views/CollectionView';
import NFTView from './views/NFTView';
import OfferView from './views/OffersView';
import UserActivityView from './views/UserActivityView';
import LandingPageView from './views/LandingPageView';
import PageNotFound from './views/PageNotFoundView';
import { useTheme } from './hooks/use-theme';
import { portalZIndexGlobals } from './utils/styles';
import { ThemeRootElement } from './constants/common';
import { useThemeGlobals } from './hooks';

const App = () => {
  const [theme, themeObject] = useTheme();

  useThemeGlobals(theme);
  portalZIndexGlobals();

  return (
    <div className={themeObject} id={ThemeRootElement}>
      <BrowserRouter>
        <Alerts />
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPageView />} />
          <Route path="/:collectionId" element={<CollectionView />}>
            <Route path="/:collectionId/activity" />
          </Route>
          <Route
            path="/:collectionId/nft/:id"
            element={<NFTView />}
          />
          <Route path="/:collectionId/offers/:id" element={<OfferView />} />
          <Route
            path="/:collectionId/activity/:id"
            element={<UserActivityView />}
          />
          {/* 👇️ only match this when no other routes match */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastHandler />
    </div>
  );
};

export default App;
