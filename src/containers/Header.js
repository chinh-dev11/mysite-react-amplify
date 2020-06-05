import React from 'react';
import Logo from '../components/Logo';
import Nav from '../components/Nav';

const Header = () => (
  <div className="p-3 d-flex justify-content-between">
    <Logo />
    <Nav />
  </div>
);

export default Header;
