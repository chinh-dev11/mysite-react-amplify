import React from 'react';
// import { useTranslation } from 'react-i18next';
import Header from './Header';
import About from './About';
import Project from './Project';
import Education from './Education';
import Footer from './Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // const { t } = useTranslation(['general']);

  return (
    <div className="App">
      <Header />
      <About />
      <Project />
      <Education />
      <Footer />
    </div>
  );
}

export default App;
