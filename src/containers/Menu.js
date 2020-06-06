import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Authentication from '../components/Authentication';
import Social from '../components/Social';
import Lang from '../components/Lang';
import { menuIsOpen } from '../app/menuSlice';
import './Menu.scss';

const Menu = () => {
  const [headerHeight, setHeaderHeight] = useState('72px');
  const [menuHeight, setMenuHeight] = useState('300px');
  const menuTopInline = { top: useSelector(menuIsOpen) ? headerHeight : `-${menuHeight}` };

  useEffect(() => {
    const elemHeaderHeight = document.querySelector('.Header').clientHeight;
    setHeaderHeight(`${elemHeaderHeight}px`);
    const elemMenuHeight = document.querySelector('.Menu').clientHeight;
    setMenuHeight(`${elemMenuHeight}px`);
  }, []);

  return (
    <div className="Menu bg-white position-fixed" style={menuTopInline}>
      <Col sm="6">
        <Row className="p-3 justify-content-end">
          <Authentication />
        </Row>
        <Row className="p-3 justify-content-between">
          <Social />
          <Lang />
        </Row>
      </Col>
    </div>
  );
};

export default Menu;
