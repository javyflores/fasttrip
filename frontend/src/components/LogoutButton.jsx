// frontend/src/components/LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout(); // Limpia sesión
    navigate('/login');   // Redirige al login
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Cerrar Sesión
    </button>
  );
}

export default LogoutButton;