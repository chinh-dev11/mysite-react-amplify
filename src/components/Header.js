import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Button from 'react-bootstrap/Button';

const Header = () => {
  const [authenticated, setauthenticated] = useState(false);

  const logoutHandler = async () => {
    try {
      const user = await Auth.signOut({ global: true });
      console.log(user);
      setauthenticated(false);
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
      setauthenticated(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {authenticated
        ? <Button variant="danger" onClick={logoutHandler}>Logout</Button>
        : <Button variant="primary" onClick={loginHandler}>Login</Button>}
    </div>
  );
};

export default Header;
