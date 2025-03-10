import React, { useState } from 'react';
import { Container, Card, Tabs, Tab, Form, Button } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';

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

  const renderPropertiesTab = () => (
    <div>
      <h5>Properties:</h5>
      <ul>
        {userProperties?.map((property) => (
          <li key={property.id}>
            <strong>{property.name}:</strong> {property.value}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderSettingsTab = () => (
    <div>
      <h5>Settings Overrides:</h5>
      <ul>
        {userSettingOverrides?.map((setting) => (
          <li key={setting.id}>
            <strong>{setting.name}:</strong> {setting.value}
          </li>
        ))}
      </ul>
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
              <div>
                <h5>Properties:</h5>
                <ul>
                  {userProperties?.map((property) => (
                    <li key={property.id}>
                      <strong>{property.name}:</strong> {property.value}
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const name = e.target.elements.propertyName.value;
                      const value = e.target.elements.propertyValue.value;
                      if (name && value) {
                        addUserProperty({ name, value });
                        e.target.reset();
                      }
                    }}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Property Name</Form.Label>
                      <Form.Control type="text" name="propertyName" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Property Value</Form.Label>
                      <Form.Control type="text" name="propertyValue" required />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Add Property
                    </Button>
                  </Form>
                </div>
              </div>
            </Tab>
            <Tab eventKey="settings" title="Settings">
              <div>
                <h5>Settings Overrides:</h5>
                <ul>
                  {userSettingOverrides?.map((setting) => (
                    <li key={setting.id}>
                      <strong>{setting.name}:</strong> {setting.value}
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const name = e.target.elements.settingName.value;
                      const value = e.target.elements.settingValue.value;
                      if (name && value) {
                        addUserSettingOverride({ name, value });
                        e.target.reset();
                      }
                    }}
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Setting Name</Form.Label>
                      <Form.Control type="text" name="settingName" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Setting Value</Form.Label>
                      <Form.Control type="text" name="settingValue" required />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Add Setting
                    </Button>
                  </Form>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationUserDetails;