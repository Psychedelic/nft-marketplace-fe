import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import DevelopedComponents from './views/DevelopedComponents';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/components" element={<DevelopedComponents />} />
    </Routes>
  </BrowserRouter>
);

export default App;
