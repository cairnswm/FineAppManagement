import React, { useState } from 'react';
import { Container, Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';

const ApplicationUserProperties = () => {
  const { userProperties, addUserProperty, updateUserProperty } = useApplication();
  const [editingId, setEditingId] = useState(null);
  const [editedProperty, setEditedProperty] = useState({});
  const [newProperty, setNewProperty] = useState({ name: '', value: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEdit = (property) => {
    setEditingId(property.id);
    setEditedProperty(property);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedProperty({});
  };

  const handleSaveEdit = async () => {
    if (!editedProperty.name || !editedProperty.value) {
      setErrorMessage('Both name and value are required.');
      return;
    }

    try {
      await updateUserProperty(editedProperty);
      setSuccessMessage('Property updated successfully!');
      setEditingId(null);
      setEditedProperty({});
    } catch (error) {
      setErrorMessage('Failed to update property. Please try again.');
    }
  };

  const handleAddProperty = async () => {
    if (!newProperty.name || !newProperty.value) {
      setErrorMessage('Both name and value are required.');
      return;
    }

    try {
      await addUserProperty(newProperty);
      setSuccessMessage('New property added successfully!');
      setNewProperty({ name: '', value: '' });
    } catch (error) {
      setErrorMessage('Failed to add new property. Please try again.');
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">User Properties</h2>
          {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>{errorMessage}</Alert>}
          {userProperties.length > 0 ? (
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
                      {editingId === property.id ? (
                        <Form.Control
                          type="text"
                          value={editedProperty.value || ''}
                          onChange={(e) =>
                            setEditedProperty({ ...editedProperty, value: e.target.value })
                          }
                        />
                      ) : (
                        property.value
                      )}
                    </td>
                    <td>
                      {editingId === property.id ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-2"
                            onClick={handleSaveEdit}
                          >
                            Save
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleEdit(property)}
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No properties available for this user.</p>
          )}
          <hr />
          <h4 className="text-center mb-3">Add New Property</h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddProperty();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Property Name</Form.Label>
              <Form.Control
                type="text"
                value={newProperty.name}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Property Value</Form.Label>
              <Form.Control
                type="text"
                value={newProperty.value}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, value: e.target.value })
                }
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Add Property
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationUserProperties;
