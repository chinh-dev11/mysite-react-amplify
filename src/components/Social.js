import React from 'react';
import { useTranslation } from 'react-i18next';

import iconLinkedin from '../assets/icons/linkedin-logo-black-sm.png';
import iconGithub from '../assets/icons/github-logo-black-sm.png';
import iconInstagram from '../assets/icons/instagram-logo-black-sm.png';

const Social = () => {
  const { t } = useTranslation(['translation']);
  return (
    <div>
      {/* <h2>{t('social.title')}</h2> */}
      <a href="https://www.linkedin.com/in/chinh11/" target="_blank" rel="noopener noreferrer"><img src={iconLinkedin} alt={t('social.alt.linkedin')} /></a>
      <a href="https://github.com/chinh-le/" target="_blank" rel="noopener noreferrer"><img src={iconGithub} alt={t('social.alt.github')} /></a>
      <a href="https://www.instagram.com/niusaul/" target="_blank" rel="noopener noreferrer"><img src={iconInstagram} alt={t('social.alt.instagram')} /></a>
    </div>
  );
};

export default Social;
