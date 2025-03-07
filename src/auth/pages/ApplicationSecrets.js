import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';

const ApplicationSecrets = () => {
  const { activeApplication } = useApplication();
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    if (activeApplication) {
      setSecrets(activeApplication.secrets || []);
    }
  }, [activeApplication]);

  if (!activeApplication) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No Application Selected</h2>
            <p className="text-center">
              Please select an application from the sidebar to view its secrets.
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{activeApplication.name} Secrets</h2>
          {secrets.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Secret Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {secrets.map((secret, index) => (
                  <tr key={index}>
                    <td>{secret.name}</td>
                    <td>{secret.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No secrets available for this application.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationSecrets;