import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Form } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';

const ApplicationSecrets = () => {
  const { activeApplication, applicationSecrets, addApplicationSecret, updateApplicationSecret } = useApplication();

  const secrets = applicationSecrets || [];
  const [editingId, setEditingId] = useState(null);
  const [editedSecret, setEditedSecret] = useState({});
  const [newSecret, setNewSecret] = useState({ name: '', value: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEdit = (secret) => {
    setEditingId(secret.id);
    setEditedSecret(secret);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedSecret({});
  };

  const handleSaveEdit = async () => {
    try {
      await updateApplicationSecret(editedSecret);
      setSuccessMessage('Secret updated successfully!');
      setEditingId(null);
      setEditedSecret({});
    } catch (error) {
      setErrorMessage('Failed to update secret. Please try again.');
    }
  };

  const handleAddSecret = async () => {
    if (!newSecret.name || !newSecret.value) {
      setErrorMessage('Both name and value are required for new secrets.');
      return;
    }

    try {
      await addApplicationSecret(newSecret);
      setSuccessMessage('New secret added successfully!');
      setNewSecret({ name: '', value: '' });
    } catch (error) {
      setErrorMessage('Failed to add new secret. Please try again.');
    }
  };

  if (!activeApplication) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No Application Selected</h2>
            <p className="text-center">
              Please select an application from the sidebar to view its secrets.
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
          <h2 className="text-center mb-4">{activeApplication.name} Secrets</h2>
          {successMessage && <p className="text-success text-center">{successMessage}</p>}
          {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
          {secrets.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Secret Name</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {secrets.map((secret) => (
                  <tr key={secret.id}>
                    <td>{secret.name}</td>
                    <td>•••••••••</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleEdit(secret)}
                        disabled
                      >
                        Edit Name
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No secrets available for this application.</p>
          )}
          <hr />
          <h4 className="text-center mb-3">Add New Secret</h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddSecret();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Secret Name</Form.Label>
              <Form.Control
                type="text"
                value={newSecret.name}
                onChange={(e) =>
                  setNewSecret({ ...newSecret, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Secret Value</Form.Label>
              <Form.Control
                type="text"
                value={newSecret.value}
                onChange={(e) =>
                  setNewSecret({ ...newSecret, value: e.target.value })
                }
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Add Secret
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationSecrets;