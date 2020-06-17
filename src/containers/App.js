import React, { useEffect } from 'react';
import { AmplifyAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';
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
  const withCognitoHostedUI = process.env.REACT_APP_COGNITO_HOSTED_UI === 'true';
  const isAuthenticated = useSelector(authIsLogged);
  const dispatchRedux = useDispatch();

  const autoSignin = () => Auth.signIn({
    username: process.env.REACT_APP_ANON_USERNAME,
    password: process.env.REACT_APP_ANON_PASSWORD,
  });

  useEffect(() => {
    // console.log('useEffect');
    if (!withCognitoHostedUI && !isAuthenticated) {
      const init = async () => {
        try {
          const user = await autoSignin();
          // console.log('user: ', user);
          if (user) {
            dispatchRedux(logIn());
            dispatchRedux(setAuthUsername(user.username));
            document.querySelector('.Content').style.marginTop = `${document.querySelector('.Header').clientHeight}px`;
          } else {
            // todo: error - handle network/Cognito network problem
            dispatchRedux(logOut());
            dispatchRedux(setAuthUsername(''));
          }
        } catch (err) {
          // todo: handle wrong username/password
          console.error(err.message);
        }
      };

      init();
    }
  }, [withCognitoHostedUI, isAuthenticated, dispatchRedux]);

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
                  {/* <Education /> */}
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
    </div>
  );
}

export default App;
// export default withAuthenticator(App);
