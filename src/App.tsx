import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { darkTheme } from './stitches.config';
import CollectionView from './views/CollectionView';
import DevelopedComponents from './views/DevelopedComponents';

const App = () => (
  <div className={darkTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CollectionView />} />
        <Route path="/components" element={<DevelopedComponents />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
