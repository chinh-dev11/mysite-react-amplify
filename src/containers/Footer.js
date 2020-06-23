import React from 'react';
import Copyright from '../components/Copyright';
import Lang from '../components/Lang';
import Social from '../components/Social';

const Footer = () => (
  <footer className="Footer pt-4 px-3 d-flex justify-content-between align-items-center">
    <Copyright />
    <Social />
    <Lang />
  </footer>
);

export default Footer;
