import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Copyright from '../components/Copyright';
import Lang from '../components/Lang';

const Footer = () => (
  <Row className="Footer px-4">
    <Col xs="8">
      <Copyright />
    </Col>
    <Col xs="4">
      <Lang />
    </Col>
  </Row>
);

export default Footer;
