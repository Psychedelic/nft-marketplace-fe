import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { darkTheme } from './stitches.config';
import { NavBar } from './components';
import CollectionView from './views/CollectionView';
import NFTView from './views/NFTView';
import DevelopedComponents from './views/DevelopedComponents';

const App = () => (
  <div className={darkTheme}>
    <NavBar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CollectionView />} />
        <Route path="/nft/:nftId" element={<NFTView />} />
        <Route path="/components" element={<DevelopedComponents />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
