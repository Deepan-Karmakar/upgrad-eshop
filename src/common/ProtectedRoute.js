import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// A simple check. In a real app, this would be more robust.
const isAuthenticated = () => {
  // We assume if a token is set, the user is "authenticated"
  // Based on the manual token setup guide
  return localStorage.getItem('isLoggedIn') === 'true';
};

const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;