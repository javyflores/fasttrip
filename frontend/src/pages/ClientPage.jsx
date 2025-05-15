// frontend/src/pages/ClientPage.jsx
import React from 'react';
import UserInfo from '../components/UserInfo';
import LogoutButton from '../components/LogoutButton';

function ClientPage() {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-primary">Panel del Cliente</h2>

        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold text-primary">Solicita tu servicio</h3>
          <form className="space-y-4 mt-4">
            <input type="text" placeholder="Dirección de recogida" className="w-full border border-gray-300 p-2 rounded-md" />
            <input type="text" placeholder="Dirección de destino" className="w-full border border-gray-300 p-2 rounded-md" />
            <select className="w-full border border-gray-300 p-2 rounded-md">
              <option value="">Tipo de carga</option>
              <option value="linea-blanca">Línea Blanca</option>
              <option value="muebles">Muebles</option>
              <option value="otros">Otros</option>
            </select>
            <button type="submit" className="w-full bg-secondary text-white py-2 rounded-md hover:bg-danger transition">
              Buscar Conductor
            </button>
          </form>
        </div>

        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold text-primary">Historial de Servicios</h3>
          <p>No hay servicios aún.</p>
        </div>
      </div>
      <UserInfo />
      <LogoutButton />
    </div>
  );
}

export default ClientPage;

