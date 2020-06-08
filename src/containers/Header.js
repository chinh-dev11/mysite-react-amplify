import React from 'react';
import Col from 'react-bootstrap/Col';
import Logo from '../components/Logo';
import MenuButton from '../components/MenuButton';

const Header = () => (
  <Col className="Header py-3 d-flex justify-content-between bg-white fixed-top">
    <Logo />
    <MenuButton />
  </Col>
);

export default Header;
