import React, { useState } from 'react';
import { Container, Card, Tabs, Tab } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';

const ApplicationUserDetails = () => {
  const { activeApplication, applicationUsers } = useApplication();
  const [activeTab, setActiveTab] = useState('details');

  if (!activeApplication) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No Application Selected</h2>
            <p className="text-center">
              Please select an application from the sidebar to view its user details.
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const renderDetailsTab = () => (
    <div>
      <h5>Application Name:</h5>
      <p>{activeApplication.name}</p>
      <h5>Description:</h5>
      <p>{activeApplication.description}</p>
      <h5>Owner:</h5>
      <p>{activeApplication.owner}</p>
      <h5>Date Created:</h5>
      <p>{activeApplication.date_created}</p>
    </div>
  );

  const renderPropertiesTab = () => (
    <div>
      <h5>Properties:</h5>
      {applicationUsers.length > 0 ? (
        <ul>
          {applicationUsers.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} ({user.role})
            </li>
          ))}
        </ul>
      ) : (
        <p>No properties available for this application.</p>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div>
      <h5>Settings:</h5>
      <p>Settings content goes here...</p>
    </div>
  );

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">{activeApplication.name} User Details</h2>
          <Tabs
            id="application-user-details-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="details" title="Details">
              {renderDetailsTab()}
            </Tab>
            <Tab eventKey="properties" title="Properties">
              {renderPropertiesTab()}
            </Tab>
            <Tab eventKey="settings" title="Settings">
              {renderSettingsTab()}
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationUserDetails;
