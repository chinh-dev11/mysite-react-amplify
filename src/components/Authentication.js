import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { authUsername, setAuthUsername, logIn } from '../app/store/authSlice';
import Resume from './Resume';

const Authentication = () => {
  const { t, i18n } = useTranslation(['translation']);
  const lang = i18n.language;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isUserResume = useSelector(authUsername) === process.env.REACT_APP_RESUME_USERNAME;
  const [validated, setValidated] = useState(false);
  const usernameInput = React.createRef();
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const usernameHandler = (evt) => {
    setUsername(evt.target.value);
  };

  const passwordHandler = (evt) => {
    setPassword(evt.target.value);
  };

  const signingIn = () => {
    Auth.signIn({ username, password })
      .then((data) => {
        // console.log(data);
        dispatch(logIn());
        dispatch(setAuthUsername(data.username));
        setIsLoading(false);
      })
      .catch((err) => {
      // console.error(err);
      // todo: handle error msg
        if (lang === 'en') {
          setAuthError(err.message);
        } else {
          setAuthError(t(`errors.${err.code}`));
        }

        setIsLoading(false);
      });
  };

  const submitHandler = (evt) => {
    const form = evt.currentTarget;

    evt.preventDefault();
    evt.stopPropagation();

    if (form.checkValidity()) {
      setIsLoading(true);
      signingIn();
    }

    setValidated(true);
  };

  return (
    <div className="Authentication border rounded p-4">
      {!isUserResume
        ? (
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group controlId="validationAuthUsername">
              <Form.Label className="d-block text-center">{t('authentication.signIn.field1.label')}</Form.Label>
              <Form.Control onChange={usernameHandler} type="text" aria-describedby="authUsernameHelpBlock" required className="text-center" tabIndex="0" ref={usernameInput} autoFocus />
              <Form.Control.Feedback type="invalid" id="authUsernameHelpBlock" className="text-center">{t('authentication.signIn.field1.desc')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationAuthPassword">
              <Form.Label className="d-block text-center">{t('authentication.signIn.field2.label')}</Form.Label>
              <Form.Control onChange={passwordHandler} type="password" aria-describedby="authPasswordHelpBlock" required className="text-center" />
              <Form.Control.Feedback type="invalid" id="authPasswordHelpBlock" className="text-center">{t('authentication.signIn.field2.desc')}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-primary" size="md" className="w-50 text-center mt-2 d-block mx-auto rounded-pill">
              {isLoading
                ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"><span className="sr-only">{t('general.loading')}</span></Spinner>
                : t('authentication.signIn.btn.signIn')}
            </Button>
            <Form.Control.Feedback className="invalid-feedback text-center mt-3">{authError}</Form.Control.Feedback>
          </Form>
        )
        : <Resume className="border-0" />}
    </div>
  );
};

export default Authentication;
