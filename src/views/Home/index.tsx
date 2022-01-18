import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.png';
import './App.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{t('translation:common.title')}</p>
      </header>
    </div>
  );
};

export default Home;
