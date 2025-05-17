// frontend/src/components/map/MapView.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import carIconUrl from '../../assets/icons/car.png';
import axios from 'axios';

const carIcon = new L.Icon({
  iconUrl: carIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function MapView({ userLocation }) {
  const [position, setPosition] = useState(userLocation || [10.4987, -66.8945]);
  const [nearbyServices, setNearbyServices] = useState([]);

  useEffect(() => {
    if (userLocation) setPosition(userLocation);
  }, [userLocation]);

  useEffect(() => {
    const fetchNearbyServices = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/drivers/nearby-services', {
          latitud: position[0],
          longitud: position[1]
        });
        setNearbyServices(res.data.services || []);
      } catch (err) {
        console.error('Error al cargar servicios cercanos:', err.message);
      }
    };
    fetchNearbyServices();
  }, [position]);

  return (
    <MapContainer center={position} zoom={14} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Ubicación del conductor */}
      <Marker position={position} icon={carIcon}>
        <Popup>Mi ubicación</Popup>
      </Marker>

      {/* Servicios cercanos */}
      {nearbyServices.map((service, idx) => (
        <Marker key={idx} position={[service.origen_lat, service.origen_lng]} icon={carIcon}>
          <Popup>{service.tipo_carga}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;