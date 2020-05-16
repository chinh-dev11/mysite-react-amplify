import React from 'react';
import { useTranslation } from 'react-i18next';

const Education = () => {
  const { t } = useTranslation(['translation']);
  return (
    <div>
      <h2>{t('education.title')}</h2>
    </div>
  );
};

export default Education;
