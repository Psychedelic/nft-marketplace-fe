import React, { useEffect } from 'react';
import { HttpAgent } from '@dfinity/agent';
import { JellyUtils } from '@psychedelic/jelly-js';
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
import config from './config/env';

const agent = new HttpAgent({ host: config.host });
const jellyUtils = new JellyUtils(agent as any);

const App = () => {
  const [theme, themeObject] = useTheme();

  useThemeGlobals(theme);
  portalZIndexGlobals();

  // TODO: the following is a basic example
  // of using jelly-js to query data in the app entry
  // it is not meant to go to production obviously
  // shall remove after comprehending
  useEffect(() => {
    console.log('[debug] app.tsx: init!');

    (async () => {
      const collections = await jellyUtils.getCollections();

      console.log('[debug] collections:', collections);
    })();
  }, []);

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
          <Route path="/offers/:id" element={<OfferView />} />
          <Route
            path="/activity/:id"
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
