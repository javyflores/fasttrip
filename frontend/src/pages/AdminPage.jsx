// frontend/src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import UserInfo from '../components/UserInfo';
import LogoutButton from '../components/LogoutButton';

function AdminPage() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar solicitudes de registro pendientes
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/requests');
        const data = await response.json();

        if (response.ok && Array.isArray(data.requests)) {
          setSolicitudes(data.requests);
        } else {
          setError('No se pudo cargar las solicitudes');
        }
      } catch (err) {
        console.error('Error al obtener solicitudes:', err.message);
        setError('Hubo un problema al cargar las solicitudes');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Manejar aprobación de solicitud
  const handleApprove = async (id_registro) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/approve/${id_registro}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();

      if (result.success) {
        alert('✅ Solicitud aprobada. Se ha enviado el correo.');
        window.location.reload();
      } else {
        alert('❌ No se pudo aprobar esta solicitud.');
      }
    } catch (error) {
      console.error('Error al aprobar usuario:', error.message);
      alert('Hubo un error al procesar esta acción.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Título */}
      <h2 className="text-2xl font-bold text-primary mb-6">Panel del Administrador</h2>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      {/* Tabla de solicitudes de registro */}
      <div className="bg-white p-4 rounded-md shadow mb-8">
        <h3 className="text-xl font-bold text-primary mb-4">Gestión de Solicitudes Pendientes</h3>

        {loading ? (
          <p>Cargando solicitudes...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : solicitudes.length === 0 ? (
          <p>No hay solicitudes pendientes.</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded overflow-hidden">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Rol Solicitado</th>
                <th className="py-2 px-4">Acción</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.id_registro} className="hover:bg-gray-100 transition">
                  <td className="py-2 px-4">{solicitud.nombre} {solicitud.apellido}</td>
                  <td className="py-2 px-4">{solicitud.email}</td>
                  <td className="py-2 px-4">{solicitud.tipo_usuario}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleApprove(solicitud.id_registro)}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                    >
                      ✅ Aprobar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      ❌ Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Información del usuario y cierre de sesión */}
      <UserInfo />
      <LogoutButton />
    </div>
  );
}

export default AdminPage;