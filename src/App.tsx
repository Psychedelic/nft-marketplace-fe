import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { darkTheme, theme as defaultTheme } from './stitches.config';
import { NavBar } from './components';
import CollectionView from './views/CollectionView';
import NFTView from './views/NFTView';
import DevelopedComponents from './views/DevelopedComponents';

// eslint-disable-next-line
const App = () => {
  const [currentTheme, setCurrentTheme] = useState('lightTheme');

  useEffect(() => {
    const getTheme = localStorage.getItem('theme');
    if (getTheme) {
      setCurrentTheme(getTheme);
    }
  });

  return (
    <div
      className={
        currentTheme === 'darkTheme' ? darkTheme : defaultTheme
      }
    >
      <BrowserRouter>
        <NavBar
          setCurrentTheme={setCurrentTheme}
          currentTheme={currentTheme}
        />
        <Routes>
          <Route path="/" element={<CollectionView />} />
          <Route path="/nft/:id" element={<NFTView />} />
          <Route
            path="/components"
            element={<DevelopedComponents />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
