import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import { about } from './About.scss';

const About = () => {
  useTranslation(['translation']);

  return (
    <div className={`${about} p-3`}>
      <h1 className="display-4">
        <Trans i18nKey="about.content.heading1" />
        ,
      </h1>
      <p className="display-4">
        <Trans i18nKey="about.content.t1" />
        ,
      </p>
      <p className="display-4">
        <Trans i18nKey="about.content.t2" />
        .
      </p>
    </div>
  );
};
export default About;
