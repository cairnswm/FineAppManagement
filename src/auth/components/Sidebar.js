import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../hooks/useAdmin';

const Sidebar = () => {
  const { user } = useAuth();
  const isAdmin = useAdmin();

  return (
    <div style={{ width: '250px', height: '100vh', backgroundColor: '#f8f9fa', padding: '1rem', position: 'fixed' }}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/home">Home</Nav.Link>
        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        <Nav.Link as={Link} to="/properties">Properties</Nav.Link>
        <Nav.Link as={Link} to="/payment">Payment</Nav.Link>
        <hr />
        <Nav.Link as={Link} to="/applications">Applications</Nav.Link>
        {isAdmin && <Nav.Link as={Link} to="/settings">Settings</Nav.Link>}
      </Nav>
    </div>
  );
};

export default Sidebar;