import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import './config/i18n';
import './index.scss';

const Root = document.getElementById('root');

Root &&
  ReactDOM.createRoot(Root).render(
    // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    // </React.StrictMode>,
  );
