import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { authUsername, setAuthUsername, logIn } from '../app/authSlice';

const Authentication = () => {
  const { t, i18n } = useTranslation(['translation']);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isUserResume = useSelector(authUsername) === process.env.REACT_APP_USERNAME_RESUME;

  const usernameHandler = (evt) => {
    // console.log(evt.target.value);
    setUsername(evt.target.value);
  };
  const passwordHandler = (evt) => {
    // console.log(evt.target.value);
    setPassword(evt.target.value);
  };
  const submitHandler = (evt) => {
    console.log('submitHandler');
    evt.preventDefault();
    // evt.persist();
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

  return (
    <div>
      <p>{`Username: ${useSelector(authUsername)}`}</p>
      {!isUserResume
        && (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formUsername">
            <Form.Label>{t('authentication.signIn.field1.label')}</Form.Label>
            <Form.Control onChange={usernameHandler} type="text" placeholder={t('authentication.signIn.field1.desc')} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>{t('authentication.signIn.field2.label')}</Form.Label>
            <Form.Control onChange={passwordHandler} type="password" placeholder={t('authentication.signIn.field2.desc')} />
          </Form.Group>
          <Button type="submit" variant="primary">{t('authentication.signIn.btnSubmit')}</Button>
        </Form>
        )}
    </div>
  );
};

export default Authentication;
// export default withAuthenticator(Authentication);
