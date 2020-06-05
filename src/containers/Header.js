import React from 'react';
import Logo from '../components/Logo';
import Lang from '../components/Lang';
import Authentication from '../components/Authentication';

const Header = () => (
  <div className="p-3">
    <Logo />
    <Lang />
    <Authentication />
  </div>
);

export default Header;
