import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider as ReduxProvider } from 'react-redux';

import './index.css';
import App from './App';
import localesConfig from './locales';
import reportWebVitals from './reportWebVitals';

// application store
import { store } from './store';

i18n.use(initReactI18next).init(localesConfig);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
