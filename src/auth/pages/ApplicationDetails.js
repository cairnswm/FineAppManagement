import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useApplication } from '../context/ApplicationContext';

const ApplicationDetails = () => {
  const { activeApplication, updateApplication, applications } = useApplication();
  const { token } = useAuth();
  const [applicationDetails, setApplicationDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', description: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (activeApplication) {
      setApplicationDetails(activeApplication);
    }
  }, [activeApplication]);

  if (!activeApplication) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No Application Selected</h2>
            <p className="text-center">
              Please select an application from the sidebar to view its details.
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const handleEditClick = () => {
    setFormValues({
      name: applicationDetails.name,
      description: applicationDetails.description,
    });
    setIsEditing(true);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSaveClick = () => {
    if (!formValues.name || !formValues.description) {
      setErrorMessage('Name and description are required.');
      return;
    }

    const updatedApplication = {
      ...activeApplication,
      name: formValues.name,
      description: formValues.description,
    };

    updateApplication(updatedApplication);
    setApplicationDetails(updatedApplication);

    const updatedApplications = applications.map((app) =>
      app.uuid === activeApplication.uuid ? updatedApplication : app
    );

    setSuccessMessage('Application details updated successfully!');
    setIsEditing(false);
  };

  return (
    <Container className="py-5">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            {isEditing ? 'Edit Application Details' : `${activeApplication.name} Details`}
          </h2>
          {successMessage && (
            <p className="text-success text-center">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-danger text-center">{errorMessage}</p>
          )}
          {applicationDetails ? (
            isEditing ? (
              <>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formValues.name}
                      onChange={(e) =>
                        setFormValues({ ...formValues, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="3"
                      value={formValues.description}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSaveClick}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{applicationDetails.name}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{applicationDetails.description}</td>
                  </tr>
                  <tr>
                    <th>Owner</th>
                    <td>{applicationDetails.owner}</td>
                  </tr>
                  <tr>
                    <th>Date Created</th>
                    <td>{applicationDetails.date_created}</td>
                  </tr>
                  <tr>
                    <th>UUID</th>
                    <td>{applicationDetails.uuid}</td>
                  </tr>
                </tbody>
              </Table>
            )
          ) : (
            <p className="text-center">Loading application details...</p>
          )}
          {!isEditing && (
            <div className="d-flex justify-content-end mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditClick}
              >
                Edit
              </button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationDetails;