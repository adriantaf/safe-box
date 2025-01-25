import { createRoot } from 'react-dom/client';
import './main.css';
import PageInfo from './PageInfo';
import React, { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageInfo />
  </StrictMode>
);
