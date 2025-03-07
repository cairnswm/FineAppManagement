import React from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';

const ApplicationProperties = () => {
  const { applicationProperties } = useApplication();

  if (applicationProperties.length === 0) {
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

  const properties = applicationProperties;

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