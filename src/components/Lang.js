import React from 'react';
import { useTranslation } from 'react-i18next';
import ListGroup from 'react-bootstrap/ListGroup';
import './Lang.scss';

const Lang = () => {
  const { t, i18n } = useTranslation(['translation']);
  const lang = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ListGroup horizontal className="Lang">
      <ListGroup.Item as="button" action onClick={() => changeLanguage(t('lang.en.label'))} className="text-uppercase" active={lang === t('lang.en.label')}>{t('lang.en.label')}</ListGroup.Item>
      <ListGroup.Item as="button" action onClick={() => changeLanguage(t('lang.fr.label'))} className="text-uppercase" active={lang === t('lang.fr.label')}>{t('lang.fr.label')}</ListGroup.Item>
      <ListGroup.Item as="button" action onClick={() => changeLanguage(t('lang.vn.label'))} className="text-uppercase" active={lang === t('lang.vn.label')}>{t('lang.vn.label')}</ListGroup.Item>
    </ListGroup>
  );
};

export default Lang;
