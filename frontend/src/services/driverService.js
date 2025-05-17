// frontend/src/services/driverService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/drivers';

const updateDriverLocation = async (id_usuario, latitud, longitud) => {
  const response = await axios.put(`${API_URL}/update-location`, {
    id_usuario,
    latitud,
    longitud
  });
  return response.data;
};

const getNearbyServices = async (latitud, longitud) => {
  const response = await axios.post(`${API_URL}/nearby-services`, { latitud, longitud });
  return response.data.services || [];
};

const getCurrentLocation = async (id_usuario) => {
  const response = await axios.get(`${API_URL}/current-location/${id_usuario}`);
  return response.data.location || [10.4987, -66.8945];
};

// Aceptar servicio
const acceptService = async (id_servicio, id_conductor) => {
  try {
    const response = await fetch(`${API_URL}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_servicio, id_conductor })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('No se pudo aceptar el servicio');
    }

    return data;
  } catch (error) {
    console.error('Error al aceptar servicio:', error.message);
    return { success: false, message: error.message };
  }
};

export default {
  updateDriverLocation,
  getNearbyServices,
  getCurrentLocation,
  acceptService
};