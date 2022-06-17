import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloProvider } from '@apollo/client';
import { HashRouter as Router } from 'react-router-dom';

import apolloClient from 'config/apolloClient';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from 'App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={apolloClient}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ApolloProvider>
);
