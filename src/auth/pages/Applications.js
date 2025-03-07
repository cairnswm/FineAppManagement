import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Applications = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Applications</h2>
              <p className="text-center">
                Welcome to the Applications page. Here you can manage and view all your applications.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Applications;
