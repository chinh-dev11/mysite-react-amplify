import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

const Authentication = () => {
  const { t, i18n } = useTranslation(['translation']);
  const [authenticated, setAuthenticated] = useState(false);

  const logoutHandler = async () => {
    try {
      const user = await Auth.signOut({ global: true });
      console.log(user);
      setAuthenticated(false);
    } catch (e) {
      console.log(e);
    }
  };

  const loginHandler = async () => {
    const payload = {
      username: 'testing',
      password: 'Passw0rd!',
    };
    try {
      const user = await Auth.signIn(payload);
      console.log(user);
      setAuthenticated(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>{t('authentication.title')}</h2>
      {authenticated
        ? <Button variant="danger" onClick={logoutHandler}>Logout</Button>
        : <Button variant="primary" onClick={loginHandler}>Login</Button>}
    </div>
  );
};

export default Authentication;
