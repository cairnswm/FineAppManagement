import React from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useApplication } from '../context/ApplicationContext';

const ApplicationProperties = () => {
  const { activeApplication, applicationProperties } = useApplication();

  if (!activeApplication) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No Application Selected</h2>
            <p className="text-center">
              Please select an application from the sidebar to view its properties.
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const { updateApplicationProperty, addApplicationProperty } = useApplication();
  const [editingId, setEditingId] = React.useState(null);
  const [editedValues, setEditedValues] = React.useState({});
  const [newProperty, setNewProperty] = React.useState({ name: '', value: '' });
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleEdit = (property) => {
    setEditingId(property.id);
    setEditedValues(property);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedValues({});
  };

  const handleSaveEdit = async () => {
    try {
      await updateApplicationProperty(editedValues);
      setSuccessMessage('Property updated successfully!');
      setEditingId(null);
      setEditedValues({});
    } catch (error) {
      setErrorMessage('Failed to update property. Please try again.');
    }
  };

  const handleAddProperty = async () => {
    if (!newProperty.name || !newProperty.value) {
      setErrorMessage('Both name and value are required for new properties.');
      return;
    }

    try {
      await addApplicationProperty(newProperty);
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
          <h2 className="text-center mb-4">{activeApplication.name} Properties</h2>
          {successMessage && <p className="text-success text-center">{successMessage}</p>}
          {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
          {applicationProperties.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Property Name</th>
                  <th>Value</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicationProperties.map((property) => (
                  <tr key={property.id}>
                    <td>{property.name}</td>
                    <td>
                      {editingId === property.id ? (
                        <input
                          type="text"
                          value={editedValues.value || ''}
                          onChange={(e) =>
                            setEditedValues({ ...editedValues, value: e.target.value })
                          }
                        />
                      ) : (
                        property.value
                      )}
                    </td>
                    <td>
                      {editingId === property.id ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={handleSaveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleEdit(property)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No properties available for this application.</p>
          )}
          <hr />
          <h4 className="text-center mb-3">Add New Property</h4>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddProperty();
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
                value={newProperty.name}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, name: e.target.value })
                }
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
                value={newProperty.value}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, value: e.target.value })
                }
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

export default ApplicationProperties;