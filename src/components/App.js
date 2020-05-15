import React from 'react';
import Header from './Header';
import Project from './Project';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Welcome to my personal site</h1>
      <Project />
    </div>
  );
}

export default App;
