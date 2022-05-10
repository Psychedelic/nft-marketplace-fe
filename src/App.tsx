import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error, NavBar } from './components';
import CollectionView from './views/CollectionView';
import NFTView from './views/NFTView';
import OfferView from './views/OffersView';
import SuccessHandling from './components/toast/success-handling';
import { useTheme } from './hooks/use-theme';

const App = () => {
  const [, themeObject] = useTheme();

  return (
    <div className={themeObject}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<CollectionView />}>
            <Route path="/activity" />
          </Route>
          <Route path="/nft/:id" element={<NFTView />} />
          <Route path="/offers/:id" element={<OfferView />} />
        </Routes>
      </BrowserRouter>
      <Error />
      <SuccessHandling />
    </div>
  );
};

export default App;
