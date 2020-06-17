import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { menuOpen, menuClose, menuIsOpen } from '../app/store/menuSlice';
import './MenuButton.scss';

const MenuButton = (props) => {
  const { disabled } = { ...props };
  // const isMenuDisabled = disabled === 'true' ? 'disabled' : '';
  const [btnDisabled, setBtnDisabled] = useState(false);
  const isOpen = useSelector(menuIsOpen);
  const dispatch = useDispatch();

  const menuHandler = () => {
    dispatch(isOpen ? menuClose() : menuOpen());
  };

  useEffect(() => {
    // console.log('useEffect');
    if (disabled === 'true') {
      setBtnDisabled(true);
    } else {
      const elemMenu = document.querySelector('.Menu');
      if (isOpen) disableBodyScroll(elemMenu);
      else enableBodyScroll(elemMenu);
    }

    // cleanup - prevent memory leaks
    return () => clearAllBodyScrollLocks();
  }, [isOpen]);

  return (
    <div className="MenuButton d-flex align-items-center">
      {isOpen
        ? (
          <button onClick={menuHandler} type="button" className="menuIcon menuIcon--close" disabled={btnDisabled}>
            <span className="one" />
            <span className="two" />
          </button>
        )
        : (
          <button type="button" onClick={menuHandler} className="menuIcon menuIcon--open" disabled={btnDisabled}>
            <span />
            <span />
            <span />
          </button>
        )}
    </div>
  );
};

export default MenuButton;
