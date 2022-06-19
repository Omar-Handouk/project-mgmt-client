import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloProvider } from '@apollo/client';
import { HashRouter as Router } from 'react-router-dom';

import apolloClient from 'config/apolloClient';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from 'App';
import { AlertsProvider } from 'contexts/AlertsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={apolloClient}>
    <AlertsProvider>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </AlertsProvider>
  </ApolloProvider>
);
