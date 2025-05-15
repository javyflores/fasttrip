// frontend/src/components/map/MapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import carIconUrl from '../../assets/icons/car.png';

// Icono del vehículo del conductor
const carIcon = new L.Icon({
  iconUrl: carIconUrl,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Componente principal del mapa
function MapView({ userLocation, businesses = [] }) {
  const [position] = useState(userLocation || [10.4987, -66.8945]);

  return (
    <MapContainer center={position} zoom={14} style={{ height: "400px", width: "100%" }}>
      {/* Capa base del mapa */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Marcador del conductor */}
      <Marker position={position} icon={carIcon}>
        <Popup>Estoy disponible</Popup>
      </Marker>

      {/* Marcadores de comercios afiliados */}
      {businesses.map((business) => (
        <Marker
          key={business.id_usuario}
          position={[business.latitud, business.longitud]}
          icon={L.divIcon({ className: 'business-marker' })}
        >
          <Popup>{business.nombre_empresa}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;