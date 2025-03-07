import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './auth/components/Navigation';
import LandingPage from './auth/pages/LandingPage';
import Login from './auth/pages/Login';
import Register from './auth/pages/Register';
import ForgotPassword from './auth/pages/ForgotPassword';
import Profile from './auth/pages/Profile';
import HomePage from './auth/pages/HomePage';
import Settings from './auth/pages/Settings';
import Properties from './auth/pages/Properties';
import Payment from './auth/pages/Payment';
import ProtectedRoute from './auth/components/ProtectedRoute';
import PublicRoute from './auth/components/PublicRoute';
import AdminRoute from './auth/components/AdminRoute';

const App = () => {
  return (
    <>
      <Navigation />
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
      </Routes>
    </>
  );
};

export default App;
