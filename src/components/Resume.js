import React, { useState, useEffect, useCallback } from 'react';
import { Storage } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { authUsername } from '../app/authSlice';
import { menuOpen } from '../app/menuSlice';

import iconDoc from '../assets/icons/iconfinder_Download_doc_5623450.svg';
import iconPdf from '../assets/icons/iconfinder_Download_pdf_5623460.svg';
import iconDownload from '../assets/icons/iconfinder_download-cloud_2561262.svg';
import './Resume.scss';


const Resume = () => {
  const resumePath = process.env.REACT_APP_RESUME_PATH;
  const { t, i18n } = useTranslation(['translation']);
  const lang = i18n.language;
  // console.log('lang: ', lang);
  const [resumeUrlPdf, setResumeUrlPdf] = useState('');
  const [resumeUrlDoc, setResumeUrlDoc] = useState('');
  const isUserResume = useSelector(authUsername) === process.env.REACT_APP_USERNAME_RESUME;
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(menuOpen());
  };

  const setResumeUrl = useCallback(
    (ext) => {
      // Error: The specified key does not exist (identityId)
      // Storage.get('private.png', { level: 'private' }) // Storage.vault.get('resume-en-new.pdf')
      // Storage.get('protected.png', { level: 'protected' })
      Storage.get(`${resumePath}${lang}.${ext}`) // public - ok
        .then((url) => {
          const req = new Request(url);
          fetch(req)
            .then((res) => {
              // console.log('res****: ', res);
              if (res.status === 200) {
                if (ext === 'pdf') setResumeUrlPdf(res.url);
                else setResumeUrlDoc(res.url);
              } else {
                // todo: a proper error msg
                console.log(res.status, res.statusText);
                console.error('Something went wrong! Please retry again later.');
                if (ext === 'pdf') setResumeUrlPdf('');
                else setResumeUrlDoc('');
              }
            })
            .catch((err) => {
              console.error('err: ', err);
              if (ext === 'pdf') setResumeUrlPdf('');
              else setResumeUrlDoc('');
            });
        })
        .catch((err) => {
          console.error('err: ', err);
          if (ext === 'pdf') setResumeUrlPdf('');
          else setResumeUrlDoc('');
        });
    },
    [resumePath, lang],
  );

  useEffect(() => {
    // set focus
    // if (menuIsOpen) {
    // console.log(usernameInput);
    // usernameInput.current.focus();
    // }

    // if (isUserResume) {
    setResumeUrl('pdf');
    setResumeUrl('docx');
    // }
  }, [setResumeUrl]);
  // }, [usernameInput, isUserResume, setResumeUrl]);


  return (
    <div className="Resume border border-rounded p-2 mb-4">
      <h3 className="text-center">{t('resume.title')}</h3>
      <ListGroup as="ul" horizontal className="justify-content-center">
        {isUserResume && resumeUrlPdf && (
          <ListGroup.Item as="li">
            <a href={resumeUrlPdf} target="_blank" rel="noreferrer noopener">
              <img src={iconPdf} alt={t('resume.formatPdf')} />
            </a>
          </ListGroup.Item>
        )}
        {isUserResume && resumeUrlDoc && (
          <ListGroup.Item as="li">
            <a href={resumeUrlDoc} target="_blank" rel="noreferrer noopener">
              <img src={iconDoc} alt={t('resume.formatDoc')} />
            </a>
          </ListGroup.Item>
        )}
        {!isUserResume && (
          <ListGroup.Item as="li">
            <Button type="button" onClick={clickHandler}>
              <img src={iconDownload} alt={t('resume.cloudDownload')} />
            </Button>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default Resume;