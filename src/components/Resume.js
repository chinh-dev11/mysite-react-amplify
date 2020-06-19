import React, {
  useState, useEffect, useCallback, useRef, useReducer,
} from 'react';
import { Storage } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Transition } from 'react-transition-group';
import transitionHelper from '../utils/transitionHelper';
import { authUsername } from '../app/store/authSlice';
import { menuOpen } from '../app/store/menuSlice';

import iconDoc from '../assets/icons/iconfinder_Download_doc_5623450.svg';
import iconPdf from '../assets/icons/iconfinder_Download_pdf_5623460.svg';
import iconDownload from '../assets/icons/iconfinder_download-cloud_2561262.svg';
import './Resume.scss';

const Resume = () => {
  const resumePath = process.env.REACT_APP_RESUME_PATH;
  const { t, i18n } = useTranslation(['translation']);
  const lang = i18n.language;
  // console.log('lang: ', lang);
  const [resumeUrlPdf, setResumeUrlPdf] = useState(null);
  const [resumeUrlDoc, setResumeUrlDoc] = useState(null);
  const isUserResume = useRef(useSelector(authUsername)).current === process.env.REACT_APP_RESUME_USERNAME;
  const dispatchRedux = useDispatch();
  const [isDownloadError, setIsDownloadError] = useState(false);

  const cloudDownloadHandler = () => {
    dispatchRedux(menuOpen());
  };

  const tryAgainHandler = () => {
    setResumeUrlPdf(null);
    setResumeUrlDoc(null);
    setIsDownloadError(false);
  };

  // todo: private and protected storage
  // Error: The specified key does not exist (identityId)
  // Storage.get('private.png', { level: 'private' }) // Storage.vault.get('resume-en-new.pdf')
  // Storage.get('protected.png', { level: 'protected' })
  useEffect(() => {
    // console.log('useEffect');
    const getFetchUrl = (ext) => Storage.get(`${resumePath}${lang}.${ext}`);
    const fetchData = async (ext, cb) => {
      const url = await getFetchUrl(ext);
      const data = await fetch(url);
      // console.log(data);
      if (data.status === 200) return cb(data.url);

      // error
      // console.error(data.status, data.statusText);
      setIsDownloadError(() => true);
      return cb(null);
    };

    if (isUserResume && !isDownloadError) {
      if (!resumeUrlPdf) {
        fetchData('pdf', setResumeUrlPdf);
      }
      if (!resumeUrlDoc) {
        fetchData('docx', setResumeUrlDoc);
      }
    }
  }, [lang, resumePath, isUserResume, resumeUrlPdf, resumeUrlDoc, isDownloadError]);

  return (
    <div className="Resume border rounded mb-4 py-4">
      <h5 className="text-center">{t('resume.title')}</h5>
      <div className="text-center">
        {isUserResume && (
          <Transition
            in
            timeout={transitionHelper.defaultTimeout}
            appear
            unmountOnExit
          >
            {(state) => (
              <div
                style={{
                  ...transitionHelper.defaultStyle,
                  ...transitionHelper.transitionStyles[state],
                }}
              >
                {isDownloadError
                  ? (
                    <>
                      <p>{t('resume.error')}</p>
                      <Button type="button" variant="outline-primary" size="md" className="w-50 rounded-pill" onClick={tryAgainHandler}>{t('resume.tryAgain')}</Button>
                    </>
                  )
                  : (
                    <>
                      <a href={resumeUrlPdf} target="_blank" rel="noreferrer noopener" className="d-inline-block px-2">
                        <img src={iconPdf} alt={t('resume.formatPdf')} style={{ width: '40px' }} />
                      </a>
                      <a href={resumeUrlDoc} target="_blank" rel="noreferrer noopener" className="d-inline-block px-2">
                        <img src={iconDoc} alt={t('resume.formatDoc')} style={{ width: '40px' }} />
                      </a>
                    </>
                  )}
              </div>
            )}
          </Transition>
        )}
        {!isUserResume && (
          <Transition
            in
            timeout={transitionHelper.defaultTimeout}
            appear
            unmountOnExit
          >
            {(state) => (
              <Button
                type="button"
                onClick={cloudDownloadHandler}
                className="border-0 bg-transparent"
                style={{
                  ...transitionHelper.defaultStyle,
                  ...transitionHelper.transitionStyles[state],
                }}
              >
                <img src={iconDownload} alt={t('resume.cloudDownload')} style={{ width: '40px' }} />
              </Button>
            )}
          </Transition>
        )}
      </div>
    </div>
  );
};

export default Resume;
