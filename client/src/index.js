import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DataProvider } from './providers/dataProvider';
import { ThemeProvider } from './providers/themeProvider';

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </DataProvider>
);
