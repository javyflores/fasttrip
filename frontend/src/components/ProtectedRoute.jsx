// frontend/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

function ProtectedRoute({ children, requiredRole }) {
  const user = authService.getUser();

  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.tipo_usuario !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;