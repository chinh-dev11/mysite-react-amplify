import React from 'react';
import Col from 'react-bootstrap/Col';
import Logo from '../components/Logo';
import MenuButton from '../components/MenuButton';

const Header = () => (
  <header className="Header col py-3 d-flex justify-content-between bg-white fixed-top">
    <Logo />
    <MenuButton />
  </header>
);

export default Header;
