import React from 'react';
import './Nav.scss';

const Nav = () => (
  <div className="Nav d-flex align-items-center">
    <div className="navIcon navIcon--open">
      <span />
      <span />
      <span />
    </div>
    <div className="navIcon navIcon--close">
      <span className="one" />
      <span className="two" />
    </div>
  </div>
);

export default Nav;
