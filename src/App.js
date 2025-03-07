import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './auth/components/Navigation';
import Sidebar from './auth/components/Sidebar';
import LandingPage from './auth/pages/LandingPage';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import ForgotPassword from './auth/pages/ForgotPassword';
import Profile from './auth/pages/Profile';
import HomePage from './auth/pages/HomePage';
import Settings from './auth/pages/Settings';
import Properties from './auth/pages/Properties';
import Payment from './auth/pages/Payment';
import Applications from './auth/pages/Applications';
import ProtectedRoute from './auth/components/ProtectedRoute';
import PublicRoute from './auth/components/PublicRoute';
import AdminRoute from './auth/components/AdminRoute';
import ApplicationDetails from './auth/pages/ApplicationDetails';
import ApplicationProperties from './auth/pages/ApplicationProperties';
import ApplicationSecrets from './auth/pages/ApplicationSecrets';
import ApplicationSettings from './auth/pages/ApplicationSettings';
import ApplicationUsers from './auth/pages/ApplicationUsers';

const App = () => {
  return (
    <>
      <Navigation />
      <div>
      <Sidebar />
      <div style={{ marginLeft: '250px' }}>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          }
        />
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/application/details"
          element={
            <ProtectedRoute>
              <ApplicationDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/application/properties"
          element={
            <ProtectedRoute>
              <ApplicationProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path="/application/secrets"
          element={
            <ProtectedRoute>
              <ApplicationSecrets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/application/settings"
          element={
            <ProtectedRoute>
              <ApplicationSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/application/users"
          element={
            <ProtectedRoute>
              <ApplicationUsers />
            </ProtectedRoute>
          }
        />
        </Routes>
      </div>
    </div>
    </>
  );
};

export default App;