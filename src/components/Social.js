import React from 'react';
import { useTranslation } from 'react-i18next';
import ListGroup from 'react-bootstrap/ListGroup';

import iconLinkedin from '../assets/icons/iconfinder_LINKEDIN_1217173.svg';
import iconGithub from '../assets/icons/iconfinder_github_4961959.svg';
import iconGitlab from '../assets/icons/iconfinder_144_Gitlab_logo_logos_4394268.svg';
import iconInstagram from '../assets/icons/iconfinder_instagram_281827.svg';

import './Social.scss';

const Social = () => {
  const { t } = useTranslation(['translation']);
  const linkLinkedin = process.env.REACT_APP_SOCIAL_LINK_LINKEDIN;
  const linkGithub = process.env.REACT_APP_SOCIAL_LINK_GITHUB;
  const linkGitlab = process.env.REACT_APP_SOCIAL_LINK_GITLAB;
  const linkInstagram = process.env.REACT_APP_SOCIAL_LINK_INSTAGRAM;
  return (
    <ListGroup as="ul" horizontal className="Social justify-content-center p-3">
      <ListGroup.Item as="li">
        <a href={linkLinkedin} target="_blank" rel="noreferrer noopener" title={t('social.alt.linkedin')}>
          <img src={iconLinkedin} alt={t('social.alt.linkedin')} />
        </a>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <a href={linkGithub} target="_blank" rel="noreferrer noopener" title={t('social.alt.github')}>
          <img src={iconGithub} alt={t('social.alt.github')} />
        </a>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <a href={linkGitlab} target="_blank" rel="noreferrer noopener" title={t('social.alt.gitlab')}>
          <img src={iconGitlab} alt={t('social.alt.gitlab')} />
        </a>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <a href={linkInstagram} target="_blank" rel="noreferrer noopener" title={t('social.alt.instagram')}>
          <img src={iconInstagram} alt={t('social.alt.instagram')} />
        </a>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default Social;
