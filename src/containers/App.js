import React, { useEffect, useCallback, useState, Suspense, useRef } from 'react';
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
import Contact from '../components/Contact';
import Social from '../components/Social';
import Resume from '../components/Resume';
import Footer from './Footer';
import CustomSpinner from '../components/CustomSpinner'
// import Recaptcha3 from '../components/ReCaptcha3'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import Admin from '../components/Admin'

// import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.scss';

const ProjectWork = React.lazy(() => import('../components/ProjectWork')); // lazy-loaded
const ProjectLab = React.lazy(() => import('../components/ProjectLab')); // lazy-loaded
const Education = React.lazy(() => import('../components/Education')); // lazy-loaded

function App() {
  // console.log('App');
  // console.log(process.env);
  const { t } = useTranslation(['translation']);
  const withCognitoHostedUI = process.env.REACT_APP_COGNITO_HOSTED_UI === 'true';
  const isAuthenticated = useSelector(authIsLogged);
  const dispatchRedux = useDispatch();
  const [isBackendDown, setIsBackendDown] = useState(false);
  // const recaptchaRef = useRef(null)
  const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY

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

  const autoLogin = async () => {
    let user = null;

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
  }

  useEffect(() => {
    // console.log('useEffect');
    if (!withCognitoHostedUI) {
      // autoLogin()

      document.querySelector('.Content').style.marginTop = `${document.querySelector('.Header').clientHeight}px`;
    };
  }, [withCognitoHostedUI]);

  return (
    <div className="App">
      {withCognitoHostedUI
        ? <AmplifyAuthenticator />
        : (
          <>
            <Header />
            <Container className="Content">
              <Row>
                {/* <Admin /> */}
                <Col lg="6">
                  {/* <About /> */}
                </Col>
                <Col lg="6" className="flex-column align-self-center">
                  <Suspense fallback={<CustomSpinner sz="lg" color="dark" />}>
                    <ProjectWork />
                  </Suspense>
                </Col>
                <Col lg="12">
                  <Suspense fallback={<CustomSpinner sz="lg" color="dark" />}>
                    <ProjectLab />
                  </Suspense>
                </Col>
                <Col lg="6">
                  <Suspense fallback={<CustomSpinner sz="lg" color="dark" />}>
                    <Education />
                  </Suspense>
                </Col>
                <Col lg="6">
                  <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
                    <Contact />
                  </GoogleReCaptchaProvider>
                  {/* <Contact inRecaptchaRef={recaptchaRef} /> */}
                  <Resume />
                  <Social />
                </Col>
              </Row>
            </Container>
            <Footer />
            <Backdrop />
            <Menu />
            {/* <Recaptcha3 ref={recaptchaRef} /> */}
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
