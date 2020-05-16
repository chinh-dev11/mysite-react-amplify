import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation(['translation']);
  return (
    <div>
      <h2>{t('about.title')}</h2>
      <h3>{t('about.content.heading1')}</h3>
      <h4>{t('about.content.heading2')}</h4>
      <h5>{t('about.content.heading3')}</h5>
      <p>{t('about.content.t1')}</p>
      <p>{t('about.content.t2')}</p>
      <p>{t('about.content.t3')}</p>
    </div>
  );
};

export default About;
