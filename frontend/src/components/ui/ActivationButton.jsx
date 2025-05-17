// frontend/src/components/ui/ActivationButton.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ActivationButton({ onStatusChange }) {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState([10.4987, -66.8945]);

  //Obtiene posición GPS y la envía al servidor
  const toggleActivation = async () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (location) => {
      const { latitude, longitude } = location.coords;

      try {
        // Enviar ubicación al backend
        await axios.put('http://localhost:5000/api/drivers/update-location', {
          id_usuario: 1,
          latitud: latitude,
          longitud: longitude
        });

        setPosition([latitude, longitude]);
        const nuevoEstado = !isActive;
        setIsActive(nuevoEstado);
        //Devuelve estado actualizado(activo/inactivo)
        onStatusChange?.(nuevoEstado ? 'activo' : 'inactivo');
      } catch (error) {
        console.error('Error al actualizar ubicación:', error.message);
        alert('No se pudo activar/desactivar');
      }
    });
  };

  return (
    <button
      onClick={toggleActivation}
      className={`w-full py-2 px-4 rounded-md transition-all duration-300 ${isActive ? 'bg-danger' : 'bg-secondary'} text-white`}
    >
      {isActive ? 'Desactivarme' : 'Activarme'}
    </button>
  );
}

export default ActivationButton;