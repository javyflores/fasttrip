// frontend/src/components/UserInfo.jsx
import React from 'react';
import authService from '../services/authService';

function UserInfo() {
  const user = authService.getUser();

  if (!user) return null;

  return (
    <div className="user-info">
      <p><strong>Usuario:</strong> {user.nombre} {user.apellido}</p>
      <p><strong>Rol:</strong> {user.tipo_usuario}</p>
    </div>
  );
}

export default UserInfo;