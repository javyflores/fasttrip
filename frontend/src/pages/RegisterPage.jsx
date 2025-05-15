// frontend/src/pages/RegisterPage.jsx
import React from 'react';
import RegisterUser from '../components/RegisterUser';
import LogoutButton from '../components/LogoutButton';

function RegisterPage() {
  const handleRegister = (user) => {
    alert(`Usuario ${user.nombre} registrado como ${user.tipo_usuario}`);
  };

  return (
    <div className="register-page">
      <h2>Registro de Usuarios - FastTrip</h2>
      <RegisterUser onRegister={handleRegister} />
      <LogoutButton />
    </div>
  );
}

export default RegisterPage;