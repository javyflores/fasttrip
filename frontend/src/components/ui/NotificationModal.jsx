// frontend/src/components/ui/NotificationModal.jsx

import React, { useEffect, useState } from 'react';
import alertSound from '../../assets/sounds/alert.mp3';
import socket from '../../services/notificationSocket';
import driverService from '../../services/driverService';

function NotificationModal() {
  const [show, setShow] = useState(false);
  const [request, setRequest] = useState(null);

  // Escuchar nueva solicitud de servicio desde WebSocket
  useEffect(() => {
    socket.on('new-service', (data) => {
      setRequest(data);
      playAlert();
      setShow(true);
    });

    return () => socket.off('new-service');
  }, []);

  // Reproducir sonido cuando llega una solicitud
  const playAlert = () => {
    const audio = new Audio(alertSound);
    audio.play();
  };

  // Aceptar solicitud de servicio
  const handleAccept = async () => {
    try {
      const result = await driverService.acceptService(request.id_servicio, request.id_conductor);
      if (result.success) {
        setShow(false);
        alert('Servicio aceptado. Comienza tu viaje.');
      }
    } catch (error) {
      console.error('Error al aceptar servicio:', error.message);
      alert('No se pudo aceptar el servicio');
    }
  };

  // Rechazar servicio
  const handleReject = () => {
    setShow(false);
  };

  return show ? (
    <div className="fixed top-4 right-4 bg-white shadow-lg p-4 rounded z-50">
      <h4 className="font-bold text-blue-900">Nueva Solicitud</h4>
      <p><strong>Cliente:</strong> {request?.cliente}</p>
      <p><strong>Origen:</strong> {request?.origen}</p>
      <p><strong>Destino:</strong> {request?.destino}</p>
      <p><strong>Tipo de carga:</strong> {request?.tipo_carga}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleAccept}
          className="bg-secondary hover:bg-danger text-white py-1 px-3 rounded"
        >
          ✅ Aceptar Servicio
        </button>
        <button
          onClick={handleReject}
          className="bg-gray-300 hover:bg-gray-400 py-1 px-3 rounded"
        >
          ❌ Rechazar
        </button>
      </div>
    </div>
  ) : null;
}

export default NotificationModal;