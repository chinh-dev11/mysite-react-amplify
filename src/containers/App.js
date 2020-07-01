import React, { useEffect, useCallback, useState, Suspense, useRef } from 'react';
import { AmplifyAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Auth} from 'aws-amplify'
import {useDispatch} from 'react-redux'
import {setAuthUsername} from '../app/store/authSlice'

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
  const withCognitoHostedUI = process.env.REACT_APP_COGNITO_HOSTED_UI === 'true';
  // const recaptchaRef = useRef(null)
  const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY
  const dispatchRedux = useDispatch()

  useEffect(() => {
    // console.log('useEffect');
    if (!withCognitoHostedUI) {
      Auth.currentUserInfo()
      .then((user) => {
        // console.log(user);
        if (user) {
          dispatchRedux(setAuthUsername(user.username));
        }
      });

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
    </div>
  );
}

export default App;
// export default withAuthenticator(App);
