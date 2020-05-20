import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

const Lang = () => {
  const { t, i18n } = useTranslation(['translation']);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {/* <h2>{t('lang.title')}</h2> */}
      <Button variant="info" onClick={() => changeLanguage('en')}>{t('lang.en.label')}</Button>
      <Button variant="info" onClick={() => changeLanguage('fr')}>{t('lang.fr.label')}</Button>
      <Button variant="info" onClick={() => changeLanguage('vn')}>{t('lang.vn.label')}</Button>
    </div>
  );
};

export default Lang;
