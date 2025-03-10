import React, { useState } from 'react';
import { Container, Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';

const ApplicationUserSettings = () => {
  const { userSettingOverrides, addUserSettingOverride, updateUserSettingOverride, applicationSettings } = useApplication();
  const [editingId, setEditingId] = useState(null);
  const [editedSetting, setEditedSetting] = useState({});
  const [newSetting, setNewSetting] = useState({ name: '', value: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEdit = (setting) => {
    setEditingId(setting.id);
    setEditedSetting(setting);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedSetting({});
  };

  const handleSaveEdit = async () => {
    const isValid = applicationSettings.some(appSetting => appSetting.name === editedSetting.name);
    if (!isValid) {
      setErrorMessage('Invalid setting name. Please ensure it matches an application setting.');
      return;
    }

    try {
      await updateUserSettingOverride(editedSetting);
      setSuccessMessage('Setting updated successfully!');
      setEditingId(null);
      setEditedSetting({});
    } catch (error) {
      setErrorMessage('Failed to update setting. Please try again.');
    }
  };

  const handleAddSetting = async () => {
    if (!newSetting.name || !newSetting.value) {
      setErrorMessage('Both name and value are required for new settings.');
      return;
    }

    const isValid = applicationSettings.some(appSetting => appSetting.name === newSetting.name);
    if (!isValid) {
      setErrorMessage('Invalid setting name. Please ensure it matches an application setting.');
      return;
    }

    try {
      await addUserSettingOverride(newSetting);
      setSuccessMessage('New setting added successfully!');
      setNewSetting({ name: '', value: '' });
    } catch (error) {
      setErrorMessage('Failed to add new setting. Please try again.');
    }
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">User Settings Overrides</h2>
          {successMessage && <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>{errorMessage}</Alert>}
          {userSettingOverrides.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Setting Name</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userSettingOverrides.map((setting) => (
                  <tr key={setting.id}>
                    <td>{setting.name}</td>
                    <td>
                      {editingId === setting.id ? (
                        <Form.Control
                          type="text"
                          value={editedSetting.value || ''}
                          onChange={(e) =>
                            setEditedSetting({ ...editedSetting, value: e.target.value })
                          }
                        />
                      ) : (
                        setting.value
                      )}
                    </td>
                    <td>
                      {editingId === setting.id ? (
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
                          onClick={() => handleEdit(setting)}
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
            <p className="text-center">No settings overrides available for this user.</p>
          )}
          <hr />
          <h4 className="text-center mb-3">Add New Setting Override</h4>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddSetting();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Setting Name</Form.Label>
              <Form.Control
                type="text"
                value={newSetting.name}
                onChange={(e) =>
                  setNewSetting({ ...newSetting, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Setting Value</Form.Label>
              <Form.Control
                type="text"
                value={newSetting.value}
                onChange={(e) =>
                  setNewSetting({ ...newSetting, value: e.target.value })
                }
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Add Setting
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationUserSettings;
