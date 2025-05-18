// frontend/src/components/map/MapView.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import carIconUrl from '../../assets/icons/car.png';
import storeIconUrl from '../../assets/icons/store.png';
import axios from 'axios';

// Definir íconos personalizados
const carIcon = new L.Icon({
  iconUrl: carIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const storeIcon = new L.Icon({
  iconUrl: storeIconUrl,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function MapView({ userLocation }) {
  const [position, setPosition] = useState(userLocation || [10.4987, -66.8945]);
  const [conductores, setConductores] = useState([]);
  const [comercios, setComercios] = useState([]);

  // Obtener posición actual del usuario si no se pasa por props
  useEffect(() => {
    if (!userLocation) {
      navigator.geolocation.getCurrentPosition((loc) => {
        const nuevaPosicion = [loc.coords.latitude, loc.coords.longitude];
        setPosition(nuevaPosicion);
      });
    }
  }, [userLocation]);

  // Cargar comercios cercanos desde el backend
  useEffect(() => {
    const loadNearbyStores = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/comercio/nearby');
        setComercios(res.data.stores || []);
      } catch (err) {
        console.error('Error al cargar comercios:', err.message);
      }
    };

    loadNearbyStores();
  }, []);

  // Escuchar conductores en tiempo real vía WebSocket
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000');

    socket.onmessage = (event) => {
      const driver = JSON.parse(event.data);
      setConductores(prev => [...prev, driver]);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Cargar servicios cercanos cuando cambia la posición
  useEffect(() => {
    const fetchNearbyServices = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/drivers/nearby-services', {
          latitud: position[0],
          longitud: position[1]
        });

        setConductores(res.data.services || []);
      } catch (err) {
        console.error('Error al obtener servicios cercanos:', err.message);
      }
    };

    fetchNearbyServices();
  }, [position]);

  return (
    <MapContainer center={position} zoom={14} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Ubicación actual */}
      <Marker position={position} icon={carIcon}>
        <Popup>Mi ubicación</Popup>
      </Marker>

      {/* Comercios cercanos */}
      {comercios.map(store => (
        <Marker key={`store-${store.id_usuario}`} position={[store.latitud, store.longitud]} icon={storeIcon}>
          <Popup>{store.nombre_empresa}</Popup>
        </Marker>
      ))}

      {/* Conductores disponibles */}
      {conductores.map(driver => (
        <Marker key={`driver-${driver.id_usuario}`} position={[driver.latitud, driver.longitud]} icon={carIcon}>
          <Popup>Conductor Disponible</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;