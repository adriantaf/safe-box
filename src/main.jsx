import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.jsx';
import { FormPassDataProvider } from './context/FormPassDataProvider.jsx';
import { DataFromDBProvider } from './context/DataFromDBProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataFromDBProvider>
      <FormPassDataProvider>
        <App />
      </FormPassDataProvider>
    </DataFromDBProvider>
  </StrictMode>,
);
