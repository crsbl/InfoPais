import React from 'react';
import ReactDOM from 'react-dom';
import './estilos/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import apollo from './apollo/index';
import { ApolloProvider } from "@apollo/react-hooks";

ReactDOM.render(
  <React.StrictMode>
       <ApolloProvider client={apollo().apolloClient}><App /></ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
