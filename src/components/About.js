import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation(['about']);
  return (
    <div>
      <h2>{t('about:title')}</h2>
      <p>{t('about:content.t1')}</p>
      <p>{t('about:content.t2')}</p>
      <p>{t('about:content.t3')}</p>
    </div>
  );
};

export default About;
