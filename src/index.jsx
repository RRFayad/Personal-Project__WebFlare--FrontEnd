import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BusinessContextProvider } from './shared/context/BusinessContext';
import { AuthContextProvider } from './shared/context/AuthContext';
import { OffersContextProvider } from './shared/context/OffersContext';
import { NewAuthContextProvider } from './shared/context/NewAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NewAuthContextProvider>
      <AuthContextProvider>
        <BusinessContextProvider>
          <OffersContextProvider>
            <App />
          </OffersContextProvider>
        </BusinessContextProvider>
      </AuthContextProvider>
    </NewAuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
