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
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        updateUserProperty(property)
                      }
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        console.log('Delete functionality to be implemented')
                      }
                    >
                      Delete
                    </button>
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
              <label htmlFor="propertyName" className="form-label">
                Property Name
              </label>
              <input
                type="text"
                className="form-control"
                id="propertyName"
                placeholder="Enter property name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="propertyValue" className="form-label">
                Property Value
              </label>
              <input
                type="text"
                className="form-control"
                id="propertyValue"
                placeholder="Enter property value"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Property
            </button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserPropertiesTable;