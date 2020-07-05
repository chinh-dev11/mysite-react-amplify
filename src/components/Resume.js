import React, {
  useState, useEffect, useCallback, useRef,
} from 'react';
import { Storage } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import Radium from 'radium';
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
  const [currLang, setCurrLang] = useState(lang);
  const [resumeUrlPdf, setResumeUrlPdf] = useState(null);
  const [resumeUrlDoc, setResumeUrlDoc] = useState(null);
  const isUserResume = useRef(useSelector(authUsername)).current === process.env.REACT_APP_RESUME_USERNAME;
  const dispatchRedux = useDispatch();
  const [isDownloadError, setIsDownloadError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
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
    setIsFetching(false);
  };

  const getResumeUrl = useCallback(
    async () => {
      const fetchUrl = async (ext) => {
        let url = await Storage.get(`${resumePath}${lang}.${ext}`);
        /**
         * Temp solution, until next fix by Amplify dev team
         *  - replacing https by http
         * Storage mock mode error: net::ERR_SSL_PROTOCOL_ERROR (https)
         * ➜ amplify mock
         *    Mock Storage endpoint is running at http://localhost:20005
         * Issue: https://github.com/aws-amplify/amplify-js/issues/5320
         */
        url = url.replace(/https:\/\/localhost/, 'http://localhost');
        const data = await fetch(url);

        return data.status === 200 ? data.url : null;
      };

      try {
        setIsFetching(true);

        if (currLang !== lang) {
          setCurrLang(lang);
          setResumeUrlPdf(null);
          setResumeUrlDoc(null);
        }

        let result;

        // pdf
        if (!resumeUrlPdf) {
          result = await fetchUrl('pdf');
          if (result) {
            setResumeUrlPdf(result);
          } else {
            setIsDownloadError(true);
            setIsFetching(false);
            return false;
          }
        }

        // doc
        if (!resumeUrlDoc) {
          result = await fetchUrl('docx');
          if (result) {
            setResumeUrlDoc(result);
          } else {
            setIsDownloadError(true);
            setIsFetching(false);
            return false;
          }
        }

        setIsFetching(false);
        return true;
      } catch (e) {
        console.error(e);
        setIsDownloadError(true);
        setIsFetching(false);
        return false;
      }
    }, [resumePath, lang, resumeUrlPdf, resumeUrlDoc, currLang],
  );

  // todo: private and protected storage
  // Error: The specified key does not exist (identityId)
  // Storage.get('private.png', { level: 'private' }) // Storage.vault.get('resume-en-new.pdf')
  // Storage.get('protected.png', { level: 'protected' })
  useEffect(() => {
    // console.log('resume - useEffect');
    if (isUserResume && !isDownloadError && !isFetching) {
      getResumeUrl();
    }
  }, [isUserResume, isDownloadError, isFetching, getResumeUrl]);

  return (
    <div className="Resume border rounded mb-4 py-4">
      <h5 className="text-center">{t('resume.title')}</h5>
      <div className="text-center">
        {isUserResume && (
          <>
            {isDownloadError
              ? (
                <>
                  <p className="text-danger my-4">
                    {t('errors.somethingWrong')}
                    .
                  </p>
                  <Button type="button" variant="outline-primary" size="md" className="w-50 rounded-pill" onClick={tryAgainHandler} aria-label={t('errors.tryAgain')}>{t('errors.tryAgain')}</Button>
                </>
              )
              : (
                <>
                  <a href={resumeUrlPdf} target="_blank" rel="noreferrer noopener" className="d-inline-block px-2" aria-label={t('resume.formatPdf')}>
                    <img src={iconPdf} alt={t('resume.formatPdf')} style={[stylesInline.hrefImg, stylesInline.imgColor]} key="pdf" />
                  </a>
                  <a href={resumeUrlDoc} target="_blank" rel="noreferrer noopener" className="d-inline-block px-2" aria-label={t('resume.formatDoc')}>
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
          aria-label={t('resume.cloudDownload')}
        >
          <img src={iconDownload} alt={t('resume.cloudDownload')} style={[stylesInline.btnImg, stylesInline.imgColor]} key="imgDownload" />
        </Button>
        )}
      </div>
    </div>
  );
};

export default Radium(Resume);
