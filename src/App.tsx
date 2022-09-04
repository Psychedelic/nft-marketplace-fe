import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar, ToastHandler, Alerts } from './components';
import CollectionView from './views/CollectionView';
import NFTView from './views/NFTView';
import OfferView from './views/OffersView';
import UserActivityView from './views/UserActivityView';
import { useTheme } from './hooks/use-theme';
import { portalZIndexGlobals } from './utils/styles';
import { ThemeRootElement } from './constants/common';
import { useThemeGlobals } from './hooks';
import Onboarding from './components/onboarding/onboarding-ui';
import ExploreCollections from './components/collections/explore-collections';

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
          <Route path="/" element={<CollectionView />}>
            <Route path="/activity" />
          </Route>
          <Route path="/nft/:id" element={<NFTView />} />
          <Route path="/offers/:id" element={<OfferView />} />
          <Route
            path="/activity/:id"
            element={<UserActivityView />}
          />
          <Route path="/create" element={<Onboarding />} />
          <Route
            path="/collections"
            element={<ExploreCollections />}
          />
        </Routes>
      </BrowserRouter>
      <ToastHandler />
    </div>
  );
};

export default App;
