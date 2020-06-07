import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Amplify from 'aws-amplify';
// import Amplify, { Storage } from 'aws-amplify';
import { Provider } from 'react-redux';
import WebFont from 'webfontloader';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import './app/i18n';

import awsconfig from './aws-exports';
// Storage.configure({ track: true, level: 'private' });

import store from './app/store';


WebFont.load({
  google: {
    families: ['Comfortaa'],
    // families: ['Comfortaa Web:300,400,700', 'sans-serif'],
  },
});

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      {/* <Suspense fallback="loading"> */}
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
