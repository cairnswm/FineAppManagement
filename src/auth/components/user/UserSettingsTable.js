import React from 'react';
import { Table, Container, Card } from 'react-bootstrap';
import { useApplication } from '../../../context/ApplicationContext';

const UserSettingsTable = () => {
  const { userSettingOverrides } = useApplication();

  if (!userSettingOverrides || userSettingOverrides.length === 0) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No User Settings Available</h2>
            <p className="text-center">
              There are no settings overrides available for the selected user.
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
          <h2 className="text-center mb-4">User Settings Overrides</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Setting Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {userSettingOverrides.map((setting) => (
                <tr key={setting.id}>
                  <td>{setting.name}</td>
                  <td>{setting.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserSettingsTable;
