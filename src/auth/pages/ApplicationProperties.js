import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';

const ApplicationProperties = () => {
  const { activeApplication } = useApplication();
  const { token } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (activeApplication) {
      fetch(
        `${process.env.REACT_APP_TENANT_API}api.php/application/${activeApplication.uuid}/properties`,
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
          setProperties(data);
        })
        .catch((err) => {
          console.error('Error fetching application properties:', err);
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
              Please select an application from the sidebar to view its properties.
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
          <h2 className="text-center mb-4">{activeApplication.name} Properties</h2>
          {properties.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Property Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>{property.name}</td>
                    <td>{property.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No properties available for this application.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationProperties;
