// frontend/src/pages/DriverPage.jsx
import React, { useEffect, useState } from 'react';
import UserInfo from '../components/UserInfo';
import LogoutButton from '../components/LogoutButton';
import ActivationButton from '../components/ActivationButton';
import MapView from '../components/map/MapView';
import NotificationModal from '../components/ui/NotificationModal';
import CallButton from '../components/ui/CallButton';
import TripStats from '../components/dashboard/TripStats';
import RealTimeTracking from '../components/tracking/RealTimeTracking';
import RatingSystem from '../components/ui/RatingSystem';

import driverService from '../services/driverService';

function DriverPage() {
  const [location, setLocation] = useState([10.4987, -66.8945]); // Ubicación por defecto
  const [businesses, setBusinesses] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);

  // Obtener ubicación del conductor desde GPS
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
      },
      () => {
        console.warn('No se pudo obtener la ubicación');
      }
    );

    loadBusinesses();
  }, []);

  // Cargar comercios cercanos
  const loadBusinesses = async () => {
    try {
      const data = await driverService.getNearbyBusinesses(location[0], location[1]);
      setBusinesses(data || []);
    } catch (error) {
      console.error('Error al cargar comercios:', error);
    }
  };

  // Manejador de estado del conductor (activo/inactivo)
  const handleStatusChange = (status) => {
    setIsAvailable(status === 'activo');
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-primary">Mi Panel – Conductor</h2>

        {/* Botón de activación */}
        <div className="flex justify-center gap-4 mb-6">
          <button className="bg-danger hover:bg-orange-600 text-white px-6 py-2 rounded-md transition">Desactivarme</button>
          <button className="bg-success hover:bg-green-700 text-white px-6 py-2 rounded-md transition">Activarme</button>
        </div>

        {/* Mapa interactivo */}
        <MapView userLocation={location} businesses={businesses} />

        {/* Notificaciones */}
        <div className="bg-white p-4 rounded-md shadow">
          <h3 className="text-lg font-semibold text-primary">Notificaciones</h3>
          <p className="text-gray-700">Tienes nuevas solicitudes pendientes.</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold text-primary">Estadísticas de Viajes</h3>
            <p>Total de viajes: <strong>15</strong></p>
            <p>Ganancias totales: <strong>Bs. 1.500.000</strong></p>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold text-primary">Viajes Recientes</h3>
            <TripStats />
          </div>
        </div>

        {/* Seguimiento en tiempo real */}
        <RealTimeTracking serviceId="12345" />

        {/* Llamada al cliente */}
        <CallButton phoneNumber="04121234567" />

        {/* Calificación del servicio */}
        <RatingSystem serviceId="12345" />

        {/* Información de usuario y logout */}
        <UserInfo />
        <LogoutButton />
      </div>
    </div>
  );
}

export default DriverPage;