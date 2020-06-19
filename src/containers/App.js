import React, { useEffect, useCallback, useState } from 'react';
import { AmplifyAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { useTranslation } from 'react-i18next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import {
  logIn, logOut, authIsLogged, setAuthUsername,
} from '../app/store/authSlice';

import Menu from './Menu';
import Header from './Header';
import Backdrop from '../components/Backdrop';
import About from '../components/About';
import ProjectWork from '../components/ProjectWork';
import ProjectLab from '../components/ProjectLab';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Social from '../components/Social';
import Resume from '../components/Resume';
import Footer from './Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  // console.log('App');
  // console.log(process.env);
  const { t } = useTranslation(['translation']);
  const withCognitoHostedUI = process.env.REACT_APP_COGNITO_HOSTED_UI === 'true';
  const isAuthenticated = useSelector(authIsLogged);
  const dispatchRedux = useDispatch();
  const [isBackendDown, setIsBackendDown] = useState(false);

  const autoSignin = () => Auth.signIn({
    username: process.env.REACT_APP_ANON_USERNAME,
    password: process.env.REACT_APP_ANON_PASSWORD,
  });

  const setAuth = useCallback(
    (username) => {
      if (username) {
        dispatchRedux(logIn());
        dispatchRedux(setAuthUsername(username));
      } else {
        dispatchRedux(logOut());
        dispatchRedux(setAuthUsername(''));
      }
    }, [dispatchRedux],
  );

  useEffect(() => {
    // console.log('useEffect');
    if (!withCognitoHostedUI) {
      let user = null;
      const init = async () => {
        try {
          // if anon idToken exists and valid
          user = await Auth.currentAuthenticatedUser();
          // console.log(`try1: ${user}`);
        } catch (err) {
          // anon auto-signin - no Cognito idToken exists in Local Storage
          // console.error(err); // not authenticated
          try {
            user = await autoSignin();
            // console.log(`try2: ${user}`);
          } catch (error) {
            // console.error(error); // "NotAuthorizedException" - Incorrect username or password.
            /* this should not happen since the anon credentials are programmatically provided in code. Unless there's a problem with Cognito authentication, network problem,...
            in this case, site showing an updating message - see isBackendDown 'errors.CognitoAuthFailed' node at the end of file */
          }
        } finally {
          // console.log(user);
          if (user) {
            setAuth(user.username);
          } else {
            setAuth();
            setIsBackendDown(true);
          }
        }

        document.querySelector('.Content').style.marginTop = `${document.querySelector('.Header').clientHeight}px`;
      };

      init();
    }
  }, [withCognitoHostedUI, setAuth]);

  return (
    <div className="App">
      {withCognitoHostedUI
        ? <AmplifyAuthenticator />
        : isAuthenticated && (
          <>
            <Header />
            <Container>
              <Row className="Content">
                <Col lg="6">
                  <About />
                </Col>
                <Col lg="6" className="flex-column align-self-center">
                  <ProjectWork />
                </Col>
                <Col lg="12">
                  <ProjectLab />
                </Col>
                <Col lg="6">
                  <Education />
                </Col>
                <Col lg="6">
                  <Contact />
                  <Resume />
                  <Social />
                </Col>
              </Row>
            </Container>
            <Footer />
            <Backdrop />
            <Menu />
          </>
        )}
      {isBackendDown && (
        <>
          <Header menuDisabled="true" />
          <Container>
            <Row className="Content">
              <Col lg="6">{t('errors.CognitoAuthFailed')}</Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default App;
// export default withAuthenticator(App);
