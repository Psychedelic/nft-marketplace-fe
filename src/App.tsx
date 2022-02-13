import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { darkTheme, globalCss } from './stitches.config';
import { NavBar } from './components';
import CollectionView from './views/CollectionView';
import NFTView from './views/NFTView';
import DevelopedComponents from './views/DevelopedComponents';
import ColourModeProvider from './ColourModeProvider';

const globalStyles = globalCss({
  html: {
    fontFamily: '$default',
    margin: 0,
    backgroundColor: '$loContrast',
  },
});

// eslint-disable-next-line
const App = () => {
  globalStyles();
  return (
    <ColourModeProvider>
      <div className={darkTheme}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<CollectionView />} />
            <Route path="/nft/:nftId" element={<NFTView />} />
            <Route
              path="/components"
              element={<DevelopedComponents />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ColourModeProvider>
  );
};

export default App;
