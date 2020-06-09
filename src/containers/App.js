import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import {
  logIn, logOut, authIsLogged, setAuthUsername,
} from '../app/authSlice';

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
import '../style/mediaQuery.scss';


function App() {
  // console.log('App');
  // console.log(process.env);
  const payloadAnon = {
    username: process.env.REACT_APP_ANON_USERNAME,
    password: process.env.REACT_APP_ANON_PASSWORD,
  };
  const isAuthenticated = useSelector(authIsLogged);
  const dispatch = useDispatch();
  const [styleInline, setStyleInline] = useState({});

  useEffect(() => {
    // console.log('useEffect');
    if (Object.keys(styleInline).length === 0) {
      const headerHeight = document.querySelector('.Header').clientHeight;
      setStyleInline({ marginTop: `${headerHeight}px` });
    }

    if (!isAuthenticated) {
      Auth.signIn(payloadAnon)
        .then((data) => {
          // console.log(data);
          dispatch(logIn());
          dispatch(setAuthUsername(data.username));
        })
        .catch((err) => {
          console.error(err);
          dispatch(logOut());
          dispatch(setAuthUsername(''));
        // todo: handle error msg
        });
    }
  }, [isAuthenticated, payloadAnon, dispatch, styleInline]);

  /*
  xs < 576
  sm >= 576
  md >= 768
  lg >= 992
  xl >= 1200
  */
  return (
    <div className="App">
      <Header />
      <Container>
        <Row className="Content" style={styleInline}>
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
    </div>
  );
}

export default App;
