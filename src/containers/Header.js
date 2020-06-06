import React from 'react';
import Logo from '../components/Logo';
import MenuButton from '../components/MenuButton';
// import Menu from './Menu';

const Header = () => (
  <div className="Header p-3 d-flex justify-content-between bg-white fixed-top">
    <Logo />
    <MenuButton />
  </div>
);

export default Header;
