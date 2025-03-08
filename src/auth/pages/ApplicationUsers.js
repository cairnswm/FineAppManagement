import React, { useEffect, useState } from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useApplication } from '../context/ApplicationContext';

const ApplicationUsers = () => {
  const { activeApplication, applicationUsers, setActiveUser } = useApplication();
  const navigate = useNavigate();
  const [users, setUsers] = useState(applicationUsers || []);

  useEffect(() => {
    setUsers(applicationUsers || []);
  }, [applicationUsers]);

  if (!activeApplication) {
    return (
      <Container className="py-5">
        <Card>
          <Card.Body>
            <h2 className="text-center">No Application Selected</h2>
            <p className="text-center">
              Please select an application from the sidebar to view its users.
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
          <h2 className="text-center mb-4">{activeApplication.name} Users</h2>
          {users.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <a 
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveUser(user);
                          navigate('/application/user-details');
                        }}
                      >
                        {user.name}
                      </a>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No users available for this application.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ApplicationUsers;