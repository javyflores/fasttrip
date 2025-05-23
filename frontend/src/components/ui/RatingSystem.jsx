// frontend/src/components/ui/RatingSystem.jsx

import React, { useState } from 'react';

function RatingSystem({ serviceId }) {
  const [rating, setRating] = useState(0);

  const submitRating = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/drivers/rate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, rating })
      });

      const result = await response.json();

      if (result.success) {
        alert('Gracias por tu calificación');
      } else {
        alert('Hubo un problema al enviar tu calificación. Inténtalo nuevamente.');
      }
    } catch (error) {
      console.error('Error al enviar calificación:', error.message);
      alert('No se pudo enviar tu calificación. Verifica tu conexión e inténtalo nuevamente.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mt-4">
      <h4 className="font-semibold text-primary">Califica tu experiencia:</h4>
      <div className="flex mt-2">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            onClick={() => setRating(star)}
            role="button"
            tabIndex="0"
            className={`cursor-pointer text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
      {rating > 0 && (
        <button
          onClick={submitRating}
          className="mt-2 bg-secondary hover:bg-danger text-white py-1 px-4 rounded transition duration-300"
        >
          Enviar Calificación
        </button>
      )}
    </div>
  );
}

export default RatingSystem;