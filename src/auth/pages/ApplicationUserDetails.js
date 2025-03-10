import React, { useState } from 'react';
import { Container, Card, Tabs, Tab } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';
import UserPropertiesTable from '../components/user/UserPropertiesTable';
import UserSettingsTable from '../components/user/UserSettingsTable';

const ApplicationUserDetails = () => {
  const { activeApplication, activeUser, setActiveUser, userProperties, userSettingOverrides } = useApplication();
  const [activeTab, setActiveTab] = useState('details');
  
  if (!activeApplication || !activeUser) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No User Selected</h2>
            <p className="text-center">
              Please select a user from the application users list to view their details.
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const renderDetailsTab = () => (
    <div>
      <h5>User Name:</h5>
      <p>{activeUser.name}</p>
      <h5>Email:</h5>
      <p>{activeUser.email}</p>
      <h5>Role:</h5>
      <p>{activeUser.role}</p>
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
              <UserPropertiesTable />
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <UserSettingsTable />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationUserDetails;