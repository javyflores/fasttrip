// frontend/src/components/tracking/RealTimeTracking.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RealTimeTracking({ serviceId }) {
  const [position, setPosition] = useState([10.4987, -66.8945]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/drivers/current-location`);
        if (res.data.success) {
          setPosition(res.data.location);
        }
      } catch (error) {
        console.error('Error al obtener ubicación:', error.message);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6">
      <h4>Seguimiento en tiempo real</h4>
      <p>Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}</p>
    </div>
  );
}

export default RealTimeTracking;