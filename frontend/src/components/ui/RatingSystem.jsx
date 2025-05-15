// frontend/src/components/ui/RatingSystem.jsx
import React, { useState } from 'react';
import driverService from '../../services/driverService';

function RatingSystem({ serviceId }) {
  const [rating, setRating] = useState(0);

  const submitRating = async () => {
    await driverService.submitRating(serviceId, rating);
    alert('Gracias por tu calificación');
  };

  return (
    <div className="rating-system">
      <h5>Califica tu experiencia:</h5>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          onClick={() => setRating(star)}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
      <button onClick={submitRating}>Enviar Calificación</button>
    </div>
  );
}

export default RatingSystem;