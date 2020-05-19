import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './Header';
import About from '../components/About';
import ProjectWork from '../components/ProjectWork';
import ProjectLab from '../components/ProjectLab';
import Education from '../components/Education';
import Footer from './Footer';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <Container fluid className="App">
      <Row>
        {/* <Header /> */}
        {/* <Col sm="6"><About /></Col> */}
        {/* <Col sm="6"><ProjectWork /></Col> */}
        {/* <Col sm="6"><ProjectLab /></Col> */}
        {/* <Col sm="6"><Education /></Col> */}
        <Footer />
      </Row>
    </Container>
  );
}

export default App;
