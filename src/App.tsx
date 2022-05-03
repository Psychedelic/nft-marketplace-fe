import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store';
import { darkTheme, theme as defaultTheme } from './stitches.config';
import { Error, NavBar } from './components';
import CollectionView from './views/CollectionView';
import NFTView from './views/NFTView';
import OfferView from './views/OffersView';
import DevelopedComponents from './views/DevelopedComponents';
import SuccessHandling from './components/toast/success-handling';

const App = () => {
  const { theme } = useThemeStore();

  return (
    <div className={theme === 'darkTheme' ? darkTheme : defaultTheme}>
      <BrowserRouter>
        <NavBar currentTheme={theme} />
        <Routes>
          <Route path="/" element={<CollectionView />} />
          <Route path="/nft/:id" element={<NFTView />} />
          <Route path="/offers/:id" element={<OfferView />} />
          <Route
            path="/components"
            element={<DevelopedComponents />}
          />
        </Routes>
      </BrowserRouter>
      <Error />
      <SuccessHandling />
    </div>
  );
};

export default App;
