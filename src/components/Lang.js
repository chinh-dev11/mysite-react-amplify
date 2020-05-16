import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

const Lang = () => {
  const { t, i18n } = useTranslation(['translation']);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div>
      <h2>{t('lang.title')}</h2>
      <Button variant="info" onClick={() => changeLanguage('en')}>{t('lang.en')}</Button>
      <Button variant="info" onClick={() => changeLanguage('fr')}>{t('lang.fr')}</Button>
      <Button variant="info" onClick={() => changeLanguage('vn')}>{t('lang.vn')}</Button>
    </div>
  );
};

export default Lang;
