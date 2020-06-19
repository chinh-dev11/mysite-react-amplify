import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';

const CustomSpinner = (props) => {
  const { t } = useTranslation(['translation']);
  const { sz, color } = { ...props };

  return (
    <Spinner animation="border" size={sz} variant={color} role="status" className="align-middle"><span className="sr-only">{t('general.loading')}</span></Spinner>
  );
};

export default CustomSpinner;
