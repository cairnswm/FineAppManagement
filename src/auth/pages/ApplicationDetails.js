import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';

const ApplicationDetails = () => {
  const { activeApplication } = useApplication();
  const { token } = useAuth();
  const [applicationDetails, setApplicationDetails] = useState(null);

  useEffect(() => {
    if (activeApplication) {
      fetch(
        `${process.env.REACT_APP_TENANT_API}api.php/application/${activeApplication.uuid}`,
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
          setApplicationDetails(data);
        })
        .catch((err) => {
          console.error('Error fetching application details:', err);
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
              Please select an application from the sidebar to view its details.
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
          <h2 className="text-center mb-4">{activeApplication.name} Details</h2>
          {applicationDetails ? (
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{applicationDetails.name}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{applicationDetails.description}</td>
                </tr>
                <tr>
                  <th>Owner</th>
                  <td>{applicationDetails.owner}</td>
                </tr>
                <tr>
                  <th>Date Created</th>
                  <td>{applicationDetails.date_created}</td>
                </tr>
                <tr>
                  <th>UUID</th>
                  <td>{applicationDetails.uuid}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p className="text-center">Loading application details...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationDetails;
