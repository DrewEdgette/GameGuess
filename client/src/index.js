import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import LoginProvider from './components/LoginProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginProvider>
    <App />
    </LoginProvider>
  </React.StrictMode>
);