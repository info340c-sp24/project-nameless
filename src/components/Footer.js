import React from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import '../style/general.css';

const Footer = () => {
  return (
    <footer className="py-3">
      <Container>
        <Row className="text-center">
          <Col xs={12}>
            <p>
              <a href="mailto:namelessl@uw.edu" className="text-dark">
                nameless@uw.edu
              </a>
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col xs={12}>
            <p>
              <a href="tel:1234567888" className="text-dark">
                123-4567-8888
              </a>
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col xs={12}>
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-external-links" className='text-dark'>
                External Links
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="https://myplan.uw.edu/home/" target="_blank" rel="noopener noreferrer">
                  MyPlan
                </Dropdown.Item>
                <Dropdown.Item href="https://dawgpath.uw.edu/" target="_blank" rel="noopener noreferrer">
                  DawgPath
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="text-center">
          <Col xs={12}>
            <p>&copy;2024 Nameless All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;