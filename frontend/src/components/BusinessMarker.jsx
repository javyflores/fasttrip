// frontend/src/components/BusinessMarker.jsx
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Icono para comercios afiliados
const markerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png ',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

function BusinessMarker({ business }) {
  return (
    <Marker position={[business.latitud, business.longitud]} icon={markerIcon}>
      <Popup>{business.nombre_empresa}</Popup>
    </Marker>
  );
}

export default BusinessMarker;