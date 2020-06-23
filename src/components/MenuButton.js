import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Radium from 'radium';
import { menuOpen, menuClose, menuIsOpen } from '../app/store/menuSlice';
import '../style/hamburger.scss';

const MenuButton = (props) => {
  const { disabled } = { ...props };
  const [btnDisabled, setBtnDisabled] = useState(false);
  const isOpen = useSelector(menuIsOpen);
  const dispatchRedux = useDispatch();

  const styles = {
    btn: {
      ':focus': {
        outline: 'none',
      },
    },
  };

  const menuHandler = () => {
    dispatchRedux(isOpen ? menuClose() : menuOpen());
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
  }, [isOpen, disabled]);

  return (
    <div className="MenuButton d-flex align-items-center">
      <button type="button" onClick={menuHandler} disabled={btnDisabled} className="border-0 bg-transparent" style={[styles.btn]}>
        <div className={`hamburger ${isOpen ? 'iconClose' : 'iconOpen'}`}>
          <span />
          <span />
          <span />
        </div>
      </button>
    </div>
  );
};

export default Radium(MenuButton);
