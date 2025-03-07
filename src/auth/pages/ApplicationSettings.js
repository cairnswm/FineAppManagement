import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';

const ApplicationSettings = () => {
  const { activeApplication, applicationSettings } = useApplication();

  useEffect(() => {
    if (activeApplication) {
      setSettings(applicationSettings || []);
    }
  }, [activeApplication, applicationSettings]);

  if (!activeApplication) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No Application Selected</h2>
            <p className="text-center">
              Please select an application from the sidebar to view its settings.
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
          <h2 className="text-center mb-4">{activeApplication.name} Settings</h2>
          {settings.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Setting Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((setting) => (
                  <tr key={setting.id}>
                    <td>{setting.name}</td>
                    <td>{setting.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No settings available for this application.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationSettings;