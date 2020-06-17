import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

import './About.scss';

const About = () => {
  useTranslation(['translation']);

  return (
    <p className="About display-4 mb-4 py-4">
      <Trans i18nKey="about.txt" />
    </p>
  );
};
export default About;
