import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Authentication from '../components/Authentication';
import Lang from '../components/Lang';
import { navIsOpen } from '../app/navSlice';
import './Menu.scss';

const Menu = () => {
  const [headerHeight, setHeaderHeight] = useState('72px');
  const [menuHeight, setMenuHeight] = useState('300px');
  const menuTopInline = { top: useSelector(navIsOpen) ? headerHeight : `-${menuHeight}` };

  useEffect(() => {
    const elemHeaderHeight = document.querySelector('.Header').clientHeight;
    setHeaderHeight(`${elemHeaderHeight}px`);
    const elemMenuHeight = document.querySelector('.Menu').clientHeight;
    setMenuHeight(`${elemMenuHeight}px`);
  }, []);

  return (
    <div className="Menu p-3 bg-success position-fixed" style={menuTopInline}>
      <Col sm="4">
        <Authentication />
        <Lang />
      </Col>
    </div>
  );
};

export default Menu;
