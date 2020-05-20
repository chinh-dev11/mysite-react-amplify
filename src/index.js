import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Amplify from 'aws-amplify';
// import Amplify, { Storage } from 'aws-amplify';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import './i18n';

import awsconfig from './aws-exports';


Amplify.configure(awsconfig);
// Storage.configure({ track: true, level: 'private' });

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      {/* <Suspense fallback="loading"> */}
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
