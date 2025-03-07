import React from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';

const Applications = () => {
  const { applications } = useApplication();

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Applications</h2>
          <ul className="list-group">
            {applications.map((app) => (
              <li key={app.id} className="list-group-item">
                {app.name}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Applications;