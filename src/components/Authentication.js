import React, { useState, useEffect, useCallback } from 'react';
import { Auth, Storage } from 'aws-amplify';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useSelector, useDispatch } from 'react-redux';
import { authUsername, setAuthUsername, logIn } from '../app/authSlice';
import './Authentication.scss';

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

  const usernameHandler = (evt) => {
    setUsername(evt.target.value);
  };

  const passwordHandler = (evt) => {
    setPassword(evt.target.value);
  };

  const submitHandler = (evt) => {
    // console.log('submitHandler');
    evt.preventDefault();
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
    if (isUserResume) {
      setResumeUrl('pdf');
      setResumeUrl('docx');
    }
  }, [isUserResume, setResumeUrl]);

  return (
    <div className="Authentication">
      {!isUserResume
        ? (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="formUsername">
              <Form.Label>{t('authentication.signIn.field1.label')}</Form.Label>
              <Form.Control onChange={usernameHandler} type="text" placeholder={t('authentication.signIn.field1.desc')} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>{t('authentication.signIn.field2.label')}</Form.Label>
              <Form.Control onChange={passwordHandler} type="password" placeholder={t('authentication.signIn.field2.desc')} />
            </Form.Group>
            <Button type="submit" variant="primary">{t('authentication.signIn.btn.signIn')}</Button>
          </Form>
        )
        : (
          <ListGroup horizontal>
            {resumeUrlPdf && <ListGroup.Item action href={resumeUrlPdf} target="_blank">PDF</ListGroup.Item>}
            {resumeUrlDoc && <ListGroup.Item action href={resumeUrlDoc} target="_blank">DOC</ListGroup.Item>}
          </ListGroup>
        )}
    </div>
  );
};

export default Authentication;
// export default withAuthenticator(Authentication);
