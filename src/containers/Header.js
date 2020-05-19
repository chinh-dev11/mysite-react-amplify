import React from 'react';
import Logo from '../components/Logo';
import Lang from '../components/Lang';
import Authentication from '../components/Authentication';

const Header = () => (
  <div>
    <Logo />
    <Lang />
    <Authentication />
  </div>
);

export default Header;
