import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { navIsOpen, navClose } from '../app/navSlice';
import './Backdrop.scss';

const Backdrop = () => {
  const isOpen = useSelector(navIsOpen);
  const [heightInline, setHeightInline] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation(['translation']);

  const navCloseHandler = () => {
    dispatch(navClose());
  };

  const keyDownHandler = useCallback((evt) => {
    console.log(evt.keyCode);
    if (evt.keyCode === 27 && isOpen) dispatch(navClose());
  }, [isOpen, dispatch]);

  useEffect(() => {
    setHeightInline(isOpen ? '100%' : '0%');

    document.addEventListener('keydown', keyDownHandler, false);

    // cleanup - prevent memory leaks
    return () => {
      document.removeEventListener('keydown', keyDownHandler, false);
    };
  }, [isOpen, keyDownHandler]);

  return (
    <div onClick={navCloseHandler} onKeyDown={keyDownHandler} role="button" tabIndex="0" aria-label={t('menu.backdropLabel')} className="Backdrop" style={{ height: heightInline }} />
  );
};

export default Backdrop;
