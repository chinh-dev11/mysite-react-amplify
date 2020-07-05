import React from 'react';
import Logo from '../components/Logo';
import MenuButton from '../components/MenuButton';

const Header = (props) => {
  const { menuDisabled } = { ...props };
  return (
    <header className="Header col py-3 d-flex justify-content-between bg-white fixed-top">
      <Logo />
      <MenuButton disabled={menuDisabled} />
    </header>
  );
};
export default Header;
