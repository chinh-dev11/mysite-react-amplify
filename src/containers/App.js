import React, { useEffect } from 'react';
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
import Footer from './Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';


function App() {
  // console.log('App');
  // console.log(process.env);
  const payloadAnon = {
    username: process.env.REACT_APP_ANON_USERNAME,
    password: process.env.REACT_APP_ANON_PASSWORD,
  };
  const isAuthenticated = useSelector(authIsLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log('useEffect');
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
  }, [isAuthenticated, payloadAnon, dispatch]);

  return (
    <Container fluid className="App m-0 p-0">
      <Menu />
      <Backdrop />
      <Row>
        <Col><Header /></Col>
      </Row>
      <Row>
        <Col sm="6" className="mb-3"><About /></Col>
        <Col sm="6" className="mb-3"><ProjectWork /></Col>
        <Col sm="6" className="mb-3"><ProjectLab /></Col>
        <Col sm="6" className="mb-3"><Education /></Col>
      </Row>
      {/* <Row><Footer /></Row> */}
    </Container>
  );
}

export default App;
