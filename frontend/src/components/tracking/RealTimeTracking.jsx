// frontend/src/components/tracking/RealTimeTracking.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import carIcon from '../../assets/icons/car.png';

const vehicleIcon = new L.Icon({
  iconUrl: carIcon,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

function RealTimeTracking({ serviceId }) {
  const [position, setPosition] = useState([10.4987, -66.8945]);

  useEffect(() => {
    const interval = setInterval(async () => {
      // Simula actualización de posición
      const newPos = await getUpdatedPosition(serviceId);
      if (newPos) setPosition(newPos);
    }, 10000); // Cada 10 segundos

    return () => clearInterval(interval);
  }, [serviceId, getUpdatedPosition]); // ← Agregamos la función como dependencia


  const getUpdatedPosition = async () => {
    // Aquí iría la llamada al backend para obtener posición actualizada
    return position.map(coord => coord + Math.random() * 0.001 - 0.0005);
  };

  return (
    <MapContainer center={position} zoom={16} style={{ height: '300px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={vehicleIcon}></Marker>
    </MapContainer>
  );
}

export default RealTimeTracking;