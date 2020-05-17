import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import Header from './Header';
import Header from './Header';
import About from './About';
import Project from './Project';
import Certificate from './Certificate';
import Education from './Education';
import Footer from './Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    // <div className="App">
    // <Container fluid="md" className="App">
    <Container fluid className="App p-0">
      {/* <Header /> */}
      <Row>
        <Col sm="6"><About /></Col>
        <Col><Project /></Col>
      </Row>
      {/* <Project /> */}
      {/* <Certificate /> */}
      {/* <Education /> */}
      {/* <Footer /> */}
    </Container>
  );
}

export default App;
