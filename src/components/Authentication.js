import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { authUsername, setAuthUsername, logIn } from '../app/store/authSlice';
import Resume from './Resume';

const Authentication = () => {
  const { t } = useTranslation(['translation']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isUserResume = useSelector(authUsername) === process.env.REACT_APP_USERNAME_RESUME;
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

  return (
    <div className="Authentication border rounded p-4">
      {!isUserResume
        ? (
          <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Form.Group controlId="validationAuthUsername">
              <Form.Label className="d-block text-center">{t('authentication.signIn.field1.label')}</Form.Label>
              <Form.Control onChange={usernameHandler} type="text" aria-describedby="authUsernameHelpBlock" required className="text-center" tabIndex="0" ref={usernameInput} autoFocus />
              {/* <Form.Control onChange={usernameHandler} type="text" placeholder={t('authentication.signIn.field1.label')} aria-describedby="authUsernameHelpBlock" required className="text-center" tabIndex="0" ref={usernameInput} autoFocus /> */}
              <Form.Control.Feedback type="invalid" id="authUsernameHelpBlock" className="text-center">{t('authentication.signIn.field1.desc')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationAuthPassword">
              <Form.Label className="d-block text-center">{t('authentication.signIn.field2.label')}</Form.Label>
              <Form.Control onChange={passwordHandler} type="password" aria-describedby="authPasswordHelpBlock" required className="text-center" />
              {/* <Form.Control onChange={passwordHandler} type="password" placeholder={t('authentication.signIn.field2.label')} aria-describedby="authPasswordHelpBlock" required className="text-center" /> */}
              <Form.Control.Feedback type="invalid" id="authPasswordHelpBlock" className="text-center">{t('authentication.signIn.field2.desc')}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" variant="outline-primary" size="md" className="w-50 text-center mt-2 d-block mx-auto" style={{ borderRadius: '4rem' }}>{t('authentication.signIn.btn.signIn')}</Button>
          </Form>
        )
        : <Resume />}
    </div>
  );
};

// export default Authentication;
export default withAuthenticator(Authentication);
