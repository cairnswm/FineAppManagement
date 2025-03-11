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
                    <Form.Control
                      type="text"
                      value={property.value}
                      onChange={(e) =>
                        updateUserProperty({ ...property, value: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() =>
                        updateUserProperty(property)
                      }
                    >
                      Save
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        console.log('Delete functionality to be implemented')
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <hr />
          <h4 className="text-center mb-3">Add New Property</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addUserProperty({ name: 'New Property', value: '' });
            }}
          >
            <div className="mb-3">
              <Form.Group className="mb-3">
                <Form.Label>Property Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter property name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Property Value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter property value"
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Add Property
              </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserPropertiesTable;