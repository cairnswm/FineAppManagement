import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';

const ApplicationSettings = () => {
  const { activeApplication, applicationSettings, addApplicationSetting, updateApplicationSetting } = useApplication();
  const [settings, setSettings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedSetting, setEditedSetting] = useState({});
  const [newSetting, setNewSetting] = useState({ name: '', value: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (activeApplication) {
      setSettings(applicationSettings || []);
    }
  }, [activeApplication, applicationSettings]);

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
    try {
      await updateApplicationSetting(editedSetting);
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

    try {
      await addApplicationSetting(newSetting);
      setSuccessMessage('New setting added successfully!');
      setNewSetting({ name: '', value: '' });
    } catch (error) {
      setErrorMessage('Failed to add new setting. Please try again.');
    }
  };

  if (!activeApplication) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No Application Selected</h2>
            <p className="text-center">
              Please select an application from the sidebar to view its settings.
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
          <h2 className="text-center mb-4">{activeApplication.name} Settings</h2>
          {successMessage && <p className="text-success text-center">{successMessage}</p>}
          {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
          {settings.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Setting Name</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {settings.map((setting) => (
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
            <p className="text-center">No settings available for this application.</p>
          )}
          <hr />
          <h4 className="text-center mb-3">Add New Setting</h4>
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

export default ApplicationSettings;