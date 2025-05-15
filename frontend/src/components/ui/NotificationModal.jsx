// frontend/src/components/ui/NotificationModal.jsx
import React, { useEffect, useState } from 'react';
import notificationSound from '../../assets/sounds/alert.mp3';
import notificationService from '../../services/notificationService';

function NotificationModal() {
  const [show, setShow] = useState(false);
  const [request, setRequest] = useState(null);

  useEffect(() => {
    notificationService.listenForNewRequests((data) => {
      setRequest(data);
      setShow(true);
      playSound();
    });
  }, []);

  const playSound = () => {
    const audio = new Audio(notificationSound);
    audio.play();
  };

  const acceptRequest = () => {
    // Lógica para aceptar servicio
    setShow(false);
  };

  return show ? (
    <div className="notification-modal">
      <h4>Nueva Solicitud</h4>
      <p>Cliente: {request.clientName}</p>
      <p>Origen: {request.origin}</p>
      <p>Destino: {request.destination}</p>
      <button onClick={acceptRequest}>Aceptar</button>
      <button onClick={() => setShow(false)}>Rechazar</button>
    </div>
  ) : null;
}

export default NotificationModal;