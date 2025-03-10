import React from 'react';
import { Table, Container, Card } from 'react-bootstrap';
import { useApplication } from '../../context/ApplicationContext';

const UserPropertiesTable = () => {
  const { userProperties, updateUserProperty, addUserProperty } = useApplication();

  if (!userProperties || userProperties.length === 0) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No User Properties Available</h2>
            <p className="text-center">
              There are no properties available for the selected user.
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
          <h2 className="text-center mb-4">User Properties</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Value</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userProperties.map((property) => (
                <tr key={property.id}>
                  <td>{property.name}</td>
                  <td>
                    <input
                      type="text"
                      value={property.value}
                      onChange={(e) =>
                        updateUserProperty({ ...property, value: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        addUserProperty({ name: property.name, value: property.value })
                      }
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserPropertiesTable;