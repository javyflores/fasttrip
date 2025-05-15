// frontend/src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await apiClient.getUsuarios();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.nombre} {user.apellido} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;