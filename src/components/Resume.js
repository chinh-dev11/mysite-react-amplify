import React, {
  useState, useEffect, useCallback, useRef, useReducer,
} from 'react';
import { Storage } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { Transition } from 'react-transition-group';
import Radium from 'radium';
import transitionHelper from '../utils/transitionHelper';
import { authUsername } from '../app/store/authSlice';
import { menuOpen } from '../app/store/menuSlice';

import iconDoc from '../assets/icons/iconfinder_Download_doc_5623450.svg';
import iconPdf from '../assets/icons/iconfinder_Download_pdf_5623460.svg';
import iconDownload from '../assets/icons/iconfinder_download-cloud_2561262.svg';

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
  const stylesInline = {
    hrefImg: {
      width: '40px',
      height: '60px',
    },
    btnImg: {
      width: '40px',
      height: '40px',
    },
    imgColor: {
      filter: 'invert(47%) sepia(14%) saturate(293%) hue-rotate(167deg) brightness(92%) contrast(87%)', // gray #6c757d
      ':hover': {
        filter: 'invert(41%) sepia(16%) saturate(6069%) hue-rotate(349deg) brightness(90%) contrast(86%)', // #D85426
      },
    },
  };

  const cloudDownloadHandler = () => {
    dispatchRedux(menuOpen());
  };

  const tryAgainHandler = () => {
    setResumeUrlPdf(null);
    setResumeUrlDoc(null);
    setIsDownloadError(false);
  };

  const getResumeUrl = useCallback(
    async (ext, cb) => {
      console.log('getResumeUrl');
      try {
        const getFetchUrl = () => Storage.get(`${resumePath}${lang}.${ext}`);

        const url = await getFetchUrl();
        const data = await fetch(url);
        // console.log(data);
        if (data.status === 200) return cb(data.url);

        // error
        // console.error(data.status, data.statusText);
        setIsDownloadError(() => true);
        return cb(null);
      } catch (e) {
        // console.error(e);
        setIsDownloadError(() => true);
        return cb(null);
      }
    }, [lang, resumePath],
  );

  // todo: private and protected storage
  // Error: The specified key does not exist (identityId)
  // Storage.get('private.png', { level: 'private' }) // Storage.vault.get('resume-en-new.pdf')
  // Storage.get('protected.png', { level: 'protected' })
  useEffect(() => {
    console.log('useEffect');
    console.log('isUserResume: ', isUserResume);
    console.log('isDownloadError: ', isDownloadError);
    console.log('resumeUrlPdf: ', resumeUrlPdf);
    console.log('resumeUrlDoc: ', resumeUrlDoc);
    if (isUserResume && !isDownloadError) {
      if (!resumeUrlPdf) {
        getResumeUrl('pdf', setResumeUrlPdf);
      }
      if (!resumeUrlDoc) {
        getResumeUrl('docx', setResumeUrlDoc);
      }
    }
  }, [isUserResume, resumeUrlPdf, resumeUrlDoc, isDownloadError, getResumeUrl]);

  return (
    <div className="Resume border rounded mb-4 py-4">
      <h5 className="text-center">{t('resume.title')}</h5>
      <div className="text-center">
        {isUserResume && (
          <>
            {isDownloadError
              ? (
                <>
                  <p className="text-danger my-4">{t('resume.error')}</p>
                  <Button type="button" variant="outline-primary" size="md" className="w-50 rounded-pill" onClick={tryAgainHandler}>{t('resume.tryAgain')}</Button>
                </>
              )
              : (
                <>
                  <a href={resumeUrlPdf} target="_blank" rel="noreferrer noopener" className="d-inline-block px-2">
                    <img src={iconPdf} alt={t('resume.formatPdf')} style={[stylesInline.hrefImg, stylesInline.imgColor]} key="pdf" />
                  </a>
                  <a href={resumeUrlDoc} target="_blank" rel="noreferrer noopener" className="d-inline-block px-2">
                    <img src={iconDoc} alt={t('resume.formatDoc')} style={[stylesInline.hrefImg, stylesInline.imgColor]} key="doc" />
                  </a>
                </>
              )}
          </>
        )}

        {!isUserResume && (
        <Button
          type="button"
          onClick={cloudDownloadHandler}
          className="border-0 bg-transparent"
        >
          <img src={iconDownload} alt={t('resume.cloudDownload')} style={[stylesInline.btnImg, stylesInline.imgColor]} key="imgDownload" />
        </Button>
        )}
      </div>
    </div>
  );
};

export default Radium(Resume);
