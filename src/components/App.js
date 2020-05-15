import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Project from './Project';
import About from './About';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const { t } = useTranslation(['general']);

  return (
    <div className="App">
      <Header />
      <h1>{t('general:welcome')}</h1>
      <About />
      <Project />
    </div>
  );
}

export default App;
