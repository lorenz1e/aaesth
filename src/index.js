import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);


