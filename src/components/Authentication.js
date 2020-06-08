import React, { useState, useEffect, useCallback } from 'react';
import { Auth, Storage } from 'aws-amplify';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector, useDispatch } from 'react-redux';
import { authUsername, setAuthUsername, logIn } from '../app/authSlice';
import { menuIsOpen } from '../app/menuSlice';
import iconPdf from '../assets/icons/iconfinder_icon-70-document-file-pdf_315672.svg';
import iconDoc from '../assets/icons/iconfinder_icon-94-document-file-doc_315717.svg';

const Authentication = () => {
  const { t, i18n } = useTranslation(['translation']);
  const lang = i18n.language;
  // console.log('lang: ', lang);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isUserResume = useSelector(authUsername) === process.env.REACT_APP_USERNAME_RESUME;
  const resumePath = process.env.REACT_APP_RESUME_PATH;
  const [resumeUrlPdf, setResumeUrlPdf] = useState('');
  const [resumeUrlDoc, setResumeUrlDoc] = useState('');
  const [validated, setValidated] = useState(false);
  const usernameInput = React.createRef();

  const usernameHandler = (evt) => {
    setUsername(evt.target.value);
  };

  const passwordHandler = (evt) => {
    setPassword(evt.target.value);
  };

  const submitHandler = (evt) => {
    const form = evt.currentTarget;

    evt.preventDefault();
    evt.stopPropagation();

    if (form.checkValidity()) {
      Auth.signIn({ username, password })
        .then((data) => {
        // console.log(data);
          dispatch(logIn());
          dispatch(setAuthUsername(data.username));
        })
        .catch((err) => {
          console.error(err);
          // todo: handle error msg
        });
    }

    setValidated(true);
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
    if (menuIsOpen) {
      // console.log(usernameInput);
      // usernameInput.current.focus();
    }

    if (isUserResume) {
      setResumeUrl('pdf');
      setResumeUrl('docx');
    }
  }, [usernameInput, isUserResume, setResumeUrl]);

  return (
    <div className="Authentication">
      {!isUserResume
        ? (
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group controlId="validationAuthUsername">
              <Form.Control onChange={usernameHandler} type="text" placeholder={t('authentication.signIn.field1.label')} aria-describedby="authUsernameHelpBlock" required className="text-center" tabIndex="0" ref={usernameInput} autoFocus />
              <Form.Control.Feedback type="invalid" id="authUsernameHelpBlock" className="text-center">{t('authentication.signIn.field1.desc')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationAuthPassword">
              <Form.Control onChange={passwordHandler} type="password" placeholder={t('authentication.signIn.field2.label')} aria-describedby="authPasswordHelpBlock" required className="text-center" />
              <Form.Control.Feedback type="invalid" id="authPasswordHelpBlock" className="text-center">{t('authentication.signIn.field2.desc')}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-primary" size="md" className="w-100 text-center">{t('authentication.signIn.btn.signIn')}</Button>
          </Form>
        )
        : (
          <ListGroup as="ul" horizontal className="justify-content-center">
            {resumeUrlPdf && (
              <ListGroup.Item as="li">
                <a href={resumeUrlPdf} target="_blank" rel="noreferrer noopener">
                  <img src={iconPdf} alt={t('authentication.download.formatPdf')} />
                </a>
              </ListGroup.Item>
            )}
            {resumeUrlDoc && (
              <ListGroup.Item as="li">
                <a href={resumeUrlDoc} target="_blank" rel="noreferrer noopener">
                  <img src={iconDoc} alt={t('authentication.download.formatDoc')} />
                </a>
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
    </div>
  );
};

export default Authentication;
// export default withAuthenticator(Authentication);
