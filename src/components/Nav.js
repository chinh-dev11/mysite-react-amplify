import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { navOpen, navClose, navIsOpen } from '../app/navSlice';
import './Nav.scss';

const Nav = () => {
  const isOpen = useSelector(navIsOpen);
  // console.log('isOpen: ', isOpen);
  const dispatch = useDispatch();
  // const [iconWidth, setIconWidth] = useState('');

  /* useEffect(() => {
    console.log('useEffect');
    setIconWidth('w-100');
  }, []); */

  const navHandler = () => {
    dispatch(isOpen ? navClose() : navOpen());
  };

  return (
    <div className="Nav d-flex align-items-center">
      {isOpen
        ? (
          <button onClick={navHandler} type="button" className="navIcon navIcon--close">
            {/* <span className={`one ${iconWidth}`} /> */}
            <span className="one" />
            <span className="two" />
          </button>
        )
        : (
          <button type="button" onClick={navHandler} className="navIcon navIcon--open">
            <span />
            <span />
            <span />
          </button>
        )}
    </div>
  );
};

export default Nav;
