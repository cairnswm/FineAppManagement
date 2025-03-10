import React, { useState } from 'react';
import { Table, Container, Card, Button, Form } from 'react-bootstrap';
import { useApplication } from '../../../context/ApplicationContext';

const UserSettingsTable = () => {
  const { userSettingOverrides, updateUserSettingOverride, addUserSettingOverride } = useApplication();
  const [editingId, setEditingId] = useState(null);
  const [editedSetting, setEditedSetting] = useState({});
  const [newSetting, setNewSetting] = useState({ name: '', value: '' });

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

  const handleEdit = (setting) => {
    setEditingId(setting.id);
    setEditedSetting(setting);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedSetting({});
  };

  const handleSaveEdit = () => {
    updateUserSettingOverride(editedSetting);
    setEditingId(null);
    setEditedSetting({});
  };

  const handleAddSetting = () => {
    if (newSetting.name && newSetting.value) {
      addUserSettingOverride(newSetting);
      setNewSetting({ name: '', value: '' });
    }
  };

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

export default UserSettingsTable;