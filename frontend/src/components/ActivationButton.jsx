// frontend/src/components/ActivationButton.jsx
import React, { useState } from 'react';
import driverService from '../services/driverService';

function ActivationButton({ onStatusChange }) {
  const [isActive, setIsActive] = useState(false);

  const toggleActivation = async () => {
    try {
      const status = !isActive ? 'activo' : 'inactivo';
      await driverService.updateDriverStatus(status);
      setIsActive(!isActive);
      onStatusChange?.(status);
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  return (
    <button className={`activation-button ${isActive ? 'active' : ''}`} onClick={toggleActivation}>
      {isActive ? 'Desactivarme' : 'Activarme'}
    </button>
  );
}

export default ActivationButton;