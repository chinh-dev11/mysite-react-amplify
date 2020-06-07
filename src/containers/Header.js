import React from 'react';
import Logo from '../components/Logo';
import MenuButton from '../components/MenuButton';

const Header = () => (
  <div className="Header px-4 py-3 d-flex justify-content-between bg-white fixed-top">
    <Logo />
    <MenuButton />
  </div>
);

export default Header;
