import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Auth } from 'aws-amplify';

import Header from './Header';
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
  const [authenticated, setAuthenticated] = useState(false);
  const payload = {
    username: process.env.REACT_APP_ANON_USERNAME,
    password: process.env.REACT_APP_ANON_PASSWORD,
  };

  useEffect(() => {
    // console.log('useEffect');
    Auth.signIn(payload)
      .then((user) => {
        // console.log(user);
        setAuthenticated(true);
      })
      .catch((e) => {
        // console.error(e);
        // can do password verifying with challenges
        setAuthenticated(false);
      });
  }, [payload]);

  return (
    <Container fluid className="App m-0 p-0">
      {/* <Row><Header /></Row> */}
      {authenticated && (
        <Row>
          <Col sm="6" className="mb-4"><About /></Col>
          <Col sm="6" className="mb-4"><ProjectWork /></Col>
          <Col sm="6" className="mb-4"><ProjectLab /></Col>
          <Col sm="6" className="mb-4"><Education /></Col>
        </Row>
      )}
      {/* <Row><Footer /></Row> */}
    </Container>
  );
}

export default App;
