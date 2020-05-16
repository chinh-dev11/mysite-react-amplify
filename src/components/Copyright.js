import React from 'react';
import { useTranslation } from 'react-i18next';

const Copyright = () => {
  const { t } = useTranslation(['translation']);
  return (
    <div>
      <h2>{t('copyright.title')}</h2>
    </div>
  );
};

export default Copyright;
