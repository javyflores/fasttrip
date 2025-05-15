// frontend/src/pages/AdminPage.jsx
import React from 'react';
import UserInfo from '../components/UserInfo';
import LogoutButton from '../components/LogoutButton';

function AdminPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-primary">Panel de Administrador</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold text-primary">Total Conductores</h3>
            <p className="text-3xl font-bold text-secondary">120</p>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold text-primary">Solicitudes Hoy</h3>
            <p className="text-3xl font-bold text-secondary">8</p>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold text-primary">Servicios Completados</h3>
            <p className="text-3xl font-bold text-secondary">65</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-xl font-bold text-primary mb-4">Usuarios Registrados</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-orange-100">
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Rol</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Juan Pérez</td>
                <td className="border px-4 py-2">juan@example.com</td>
                <td className="border px-4 py-2">Conductor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <UserInfo />
      <LogoutButton />
    
    </div>
  );
}

export default AdminPage;

