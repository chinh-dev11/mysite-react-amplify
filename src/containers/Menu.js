import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Authentication from '../components/Authentication';
import { menuIsOpen } from '../app/store/menuSlice';
import './Menu.scss';


const Menu = () => {
  const [headerHeight, setHeaderHeight] = useState('72px');
  const [menuHeight, setMenuHeight] = useState('300px');
  const menuTopInline = { top: useSelector(menuIsOpen) ? headerHeight : `-${menuHeight}` };

  useEffect(() => {
    console.log('useEffect');
    const elemHeaderHeight = document.querySelector('.Header').clientHeight;
    const elemMenuHeight = document.querySelector('.Menu').clientHeight;

    setHeaderHeight(`${elemHeaderHeight}px`);
    setMenuHeight(`${elemMenuHeight}px`);
  }, []);

  return (
    <div className="Menu p-4 bg-white position-fixed d-flex flex-row" style={menuTopInline}>
      <Col sm="10" md="8" lg="6" xl="5" className="mb-4">
        <Authentication />
      </Col>
    </div>
  );
};

export default Menu;
