// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import RegisterPage from './pages/RegisterPage';
import UserList from './components/UserList';
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './pages/AdminPage';
import ClientPage from './pages/ClientPage';
import BusinessPage from './pages/BusinessPage';
import DriverPage from './pages/DriverPage';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas - Administrador */}
        <Route
          path="/register"
          element={
            <ProtectedRoute requiredRole="admin">
              <RegisterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <UserList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Rutas por rol */}
        <Route
          path="/client"
          element={
            <ProtectedRoute requiredRole="cliente">
              <ClientPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/business"
          element={
            <ProtectedRoute requiredRole="comercio">
              <BusinessPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/driver"
          element={
            <ProtectedRoute requiredRole="conductor">
              <DriverPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;