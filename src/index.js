import React from 'react';
import ReactDOM from 'react-dom';
import Amplify, { Storage } from 'aws-amplify';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import './app/i18n';
import './index.scss';

import awsconfig from './aws-exports';
// Storage.configure({ track: true, level: 'private' });

import store from './app/store/store';

WebFont.load({
  google: {
    families: ['Comfortaa', 'Quicksand'],
  },
});

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
