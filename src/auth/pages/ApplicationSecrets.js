import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';

const ApplicationSecrets = () => {
  const { activeApplication } = useApplication();
  const { token } = useAuth();
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    if (activeApplication) {
      fetch(
        `${process.env.REACT_APP_TENANT_API}api.php/application/${activeApplication.uuid}/secrets`,
        {
          headers: {
            'Content-Type': 'application/json',
            APP_ID: activeApplication.uuid,
            token: token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setSecrets(data);
        })
        .catch((err) => {
          console.error('Error fetching application secrets:', err);
        });
    }
  }, [activeApplication, token]);

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
                {secrets.map((secret) => (
                  <tr key={secret.id}>
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
