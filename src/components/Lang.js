import React from 'react';
import { useTranslation } from 'react-i18next';
import ListGroup from 'react-bootstrap/ListGroup';
import Radium from 'radium';

const Lang = () => {
  const { t, i18n } = useTranslation(['translation']);
  const lang = i18n.language;
  const cssClasses = 'btn-light text-uppercase border-0 bg-transparent';
  const stylesInline = {
    fontSize: '0.7rem',
    ':focus': {
      outline: 0,
      boxShadow: 'none',
    },
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ListGroup as="ul" horizontal className="Lang">
      <ListGroup.Item as="li" className="border-0 p-0">
        <button type="button" onClick={() => changeLanguage(t('lang.en.label'))} className={[`${cssClasses} mr-3 ${lang === t('lang.en.label') && 'text-primary'}`]} style={stylesInline} key={t('lang.en.label')}>{t('lang.en.label')}</button>
      </ListGroup.Item>
      <ListGroup.Item as="li" className="border-0 p-0">
        <button type="button" onClick={() => changeLanguage(t('lang.fr.label'))} className={[`${cssClasses} ${lang === t('lang.fr.label') && 'text-primary'}`]} style={stylesInline} key={t('lang.fr.label')}>{t('lang.fr.label')}</button>
      </ListGroup.Item>
      {/* <ListGroup.Item as="li" className="border-0 p-0">
        <button type="button" onClick={() => changeLanguage(t('lang.vn.label'))} className={[`${cssClasses} ${lang === t('lang.vn.label') && 'text-primary'}`]} style={stylesInline} key={t('lang.vn.label')}>{t('lang.vn.label')}</button>
      </ListGroup.Item> */}
    </ListGroup>
  );
};

export default Radium(Lang);
