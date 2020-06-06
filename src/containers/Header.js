import React from 'react';
import Logo from '../components/Logo';
import Nav from '../components/Nav';
// import Menu from './Menu';

const Header = () => (
  <div className="Header p-3 d-flex justify-content-between bg-white fixed-top">
    <Logo />
    <Nav />
  </div>
);

export default Header;
