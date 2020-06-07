import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';

import './About.scss';

const About = () => {
  const [styleInline, setStyleInline] = useState({});

  useTranslation(['translation']);

  useEffect(() => {
    const headerHeight = document.querySelector('.Header').clientHeight;
    setStyleInline({ marginTop: `${headerHeight}px` });
  }, []);

  return (
    <div className="About p-3" style={styleInline}>
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
