import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { navOpen, navClose, navIsOpen } from '../app/navSlice';
import './Nav.scss';

const Nav = () => {
  const isOpen = useSelector(navIsOpen);
  const dispatch = useDispatch();

  const navHandler = () => {
    dispatch(isOpen ? navClose() : navOpen());
  };

  useEffect(() => {
    // console.log('useEffect');
    const elemMenu = document.querySelector('.Menu');
    if (isOpen) disableBodyScroll(elemMenu);
    else enableBodyScroll(elemMenu);

    // cleanup - prevent memory leaks
    return () => clearAllBodyScrollLocks();
  }, [isOpen]);

  return (
    <div className="Nav d-flex align-items-center">
      {isOpen
        ? (
          <button onClick={navHandler} type="button" className="navIcon navIcon--close">
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
