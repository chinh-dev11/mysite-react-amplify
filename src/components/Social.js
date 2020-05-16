import React from 'react';
import { useTranslation } from 'react-i18next';

const Social = () => {
  const { t } = useTranslation(['translation']);
  return (
    <div>
      <h2>{t('social.title')}</h2>
    </div>
  );
};

export default Social;
