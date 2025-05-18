// frontend/src/pages/ClientPage.jsx

import React, { useEffect, useState } from 'react';
import MapView from '../components/map/MapView';
import ServiceRequestForm from '../components/ui/ServiceRequestForm';
import NotificationModal from '../components/ui/NotificationModal';
import RatingSystem from '../components/ui/RatingSystem';

function ClientPage() {
  const [currentService, setCurrentService] = useState(null);
  const [showRating, setShowRating] = useState(false);

  // Simular datos del cliente
  const clientId = 1;

  // Mostrar calificación si el servicio fue completado
  useEffect(() => {
    const checkCompletedService = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/client/${clientId}/last-service`);
        const data = await response.json();

        if (data.service.estado === 'completado' && !data.service.calificado) {
          setShowRating(true);
        }
      } catch (error) {
        console.error('Error al revisar servicios:', error.message);
      }
    };

    checkCompletedService();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-primary">Mi Panel – Cliente</h2>

      {/* Mapa con comercios y conductores cercanos */}
      <div className="mt-4">
        <MapView />
      </div>

      {/* Formulario para generar nueva solicitud */}
      <div className="mt-6">
        <ServiceRequestForm clientId={clientId} />
      </div>

      {/* Notificaciones push */}
      <NotificationModal />

      {/* Sistema de calificación (si aplica) */}
      {showRating && (
        <div className="mt-6">
          <h4 className="font-semibold text-lg">Califica tu experiencia:</h4>
          <RatingSystem serviceId="ultimo_servicio_123" />
        </div>
      )}
    </div>
  );
}

export default ClientPage;