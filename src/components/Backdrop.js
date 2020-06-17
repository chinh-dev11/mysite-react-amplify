import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { menuIsOpen, menuClose } from '../app/store/menuSlice';
import './Backdrop.scss';

const Backdrop = () => {
  const isOpen = useSelector(menuIsOpen);
  const [heightInline, setHeightInline] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation(['translation']);

  const menuCloseHandler = () => {
    dispatch(menuClose());
  };

  const keyDownHandler = useCallback((evt) => {
    // console.log(evt.keyCode);
    if (evt.keyCode === 27 && isOpen) dispatch(menuClose());
  }, [isOpen, dispatch]);

  useEffect(() => {
    // console.log('useEffect');
    setHeightInline(isOpen ? '100%' : '0%');

    document.addEventListener('keydown', keyDownHandler, false);

    // cleanup - prevent memory leaks
    return () => {
      document.removeEventListener('keydown', keyDownHandler, false);
    };
  }, [isOpen, keyDownHandler]);

  return (
    <div onClick={menuCloseHandler} onKeyDown={keyDownHandler} role="button" tabIndex="0" aria-label={t('menu.backdropLabel')} className="Backdrop" style={{ height: heightInline }} />
  );
};

export default Backdrop;
