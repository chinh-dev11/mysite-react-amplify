import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Social from '../components/Social';
import Contact from '../components/Contact';
import Copyright from '../components/Copyright';
import Lang from '../components/Lang';

const Footer = () => (
  <Container style={{ marginTop: '72px' }}>
    <Row className="no-gutters">
      <Col xs="12">
        <Contact />
      </Col>
      <Col xs="12">
        {/* <Social /> */}
      </Col>
    </Row>
    <Row className="no-gutters">
      <Col xs="6">
        {/* <Copyright /> */}
      </Col>
      <Col xs="6">
        {/* <Lang /> */}
      </Col>
    </Row>
  </Container>
);

export default Footer;
