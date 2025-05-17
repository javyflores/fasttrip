// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Login from './components/Login';
//import RegisterUser from './components/RegisterUser';
import SolregPage from './pages/SolregPage';
import DriverPage from './pages/DriverPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto */}
        <Route path="/" element={<Login />} />

        {/* Páginas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/solreg" element={<SolregPage />} />

        {/* Páginas protegidas - Conductores */}
        <Route
          path="/driver"
          element={
            <ProtectedRoute requiredRole="conductor">
              <DriverPage />
            </ProtectedRoute>
          }
        />

        {/* Otras páginas protegidas (opcional más adelante) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <div>Admin Dashboard (por definir)</div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/client"
          element={
            <ProtectedRoute requiredRole="cliente">
              <div>Client Dashboard (por definir)</div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/business"
          element={
            <ProtectedRoute requiredRole="comercio">
              <div>Business Dashboard (por definir)</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;