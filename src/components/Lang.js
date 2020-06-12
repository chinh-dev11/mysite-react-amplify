import React from 'react';
import { useTranslation } from 'react-i18next';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import './Lang.scss';

const Lang = () => {
  const { t, i18n } = useTranslation(['translation']);
  const lang = i18n.language;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ListGroup as="ul" horizontal className="Lang">
      <ListGroup.Item as="li">
        <Button variant="light" type="button" onClick={() => changeLanguage(t('lang.en.label'))} className="text-uppercase" active={lang === t('lang.en.label')}>{t('lang.en.label')}</Button>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Button variant="light" type="button" onClick={() => changeLanguage(t('lang.fr.label'))} className="text-uppercase" active={lang === t('lang.fr.label')}>{t('lang.fr.label')}</Button>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <Button variant="light" type="button" onClick={() => changeLanguage(t('lang.vn.label'))} className="text-uppercase" active={lang === t('lang.vn.label')}>{t('lang.vn.label')}</Button>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Lang;
