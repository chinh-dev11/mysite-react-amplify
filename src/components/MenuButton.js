import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { menuOpen, menuClose, menuIsOpen } from '../app/menuSlice';
import './MenuButton.scss';

const MenuButton = () => {
  const isOpen = useSelector(menuIsOpen);
  const dispatch = useDispatch();

  const menuHandler = () => {
    dispatch(isOpen ? menuClose() : menuOpen());
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
    <div className="MenuButton d-flex align-items-center">
      {isOpen
        ? (
          <button onClick={menuHandler} type="button" className="menuIcon menuIcon--close">
            <span className="one" />
            <span className="two" />
          </button>
        )
        : (
          <button type="button" onClick={menuHandler} className="menuIcon menuIcon--open">
            <span />
            <span />
            <span />
          </button>
        )}
    </div>
  );
};

export default MenuButton;
